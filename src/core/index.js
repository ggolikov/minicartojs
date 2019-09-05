import { Map } from '../map';
import { Layer } from '../layer';
import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

const core = {
    _providers: [
        'leaflet',
        'ol',
    ],

    init: function (config = {}, container, provider = 'leaflet') {
        this._container = container;
        this._initialClassName = container.className;
        this._config = config;
        this._requestAPIUrl(config)
            .then(res => {
                let { maps_api_config } = config,
                    { user_name, maps_api_template } = maps_api_config;

                config.layers.forEach(layer => {
                    if (!("urlTemplate" in layer.options)) {
                        layer.options.urlTemplate = `${TEMPLATE_URL}/${user_name}/api/v1/map/${res.layergroupid}/{z}/{x}/{y}.png`;
                    }
                });
                console.log(config);
                this.setProvider(provider);
            });
    },

    setProvider: function (provider) {
        this._provider = provider;

        let map = this.createMap(),
            config = this._config;

        if ("layers" in config) {
            for (let i = 0, len = config.layers.length; i < len; i++) {
                let layer = this.createLayer(config.layers[i]);
                map.addLayer(layer);
            }
        }

        this._map = map;
    },

    createMap: function () {
        let { center, zoom } = this._config;
        center = Array.isArray(center) ? center : JSON.parse(center);
        this._clearContainer();

        return new Map(this._container, { center, zoom }, this._provider);
    },

    createLayer: function (options) {
        return new Layer(options, this._provider);
    },

    _clearContainer: function () {
        let container = this._container;
        let containerClone = container.cloneNode(true);
        containerClone.innerHTML = '';
        containerClone.className = this._initialClassName;
        container.parentNode.replaceChild(containerClone, container);
        this._container = containerClone;
    },

    _requestAPIUrl: function (config) {
        let layers = config.layers.map(layer => {
            let { type } = layer;

            if (type === 'tiled') {
                return {
                    type: 'http',
                    options: {
                        urlTemplate: layer.options.urlTemplate
                    }
                }
            } else if (type === 'CartoDB') {
                return {
                    type: "mapnik",
                    options: layer.options
                }
            }
        });

        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({layers})
        };

        return fetch(MAPS_API_URL, requestOptions)
            .then(res => res.json())
    }
}

export default {
    core,
    Map,
    Layer
}
