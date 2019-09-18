// import { Map } from '../Map';
// import { Layer } from '../TileLayer';
import LibraryFactory from '../LibraryFactory';
import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

const core = {
    _providers: [
        'leaflet',
        'ol',
    ],

    init: function (config = {}, container, library = 'leaflet') {

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
                this.setLibrary(library);
            });
    },

    setLibrary: function (library) {
        this._library = library;
        let factory = LibraryFactory.createFactory(library);
            console.log(factory);
        let { center, zoom } = this._config;
            center = Array.isArray(center) ? center : JSON.parse(center);
            this._clearContainer();


        let map = factory.createMap(this._container, { center, zoom }),
            config = this._config;

        if ("layers" in config) {
            for (let i = 0, len = config.layers.length; i < len; i++) {
                let layer = factory.createLayer(config.layers[i]);
                map.addLayer(layer);
            }
        }

        this._map = map;
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
            .then(res => res.json());
    }
}

export default {
    core,
    // Map,
    // Layer
}
