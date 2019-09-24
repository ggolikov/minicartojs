// import { Map } from '../Map';
// import { Layer } from '../TileLayer';
import LibraryFactory from '../LibraryFactory';
import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

const core = {
     init: function (config = {}, container, library = 'leaflet') {
        this._container = container;
        this._config = config;
        this._requestAPIUrl(config)
            .then(res => {
                let { maps_api_config } = config,
                    { user_name } = maps_api_config;

                config.layers.forEach(layer => {
                    if (!("urlTemplate" in layer.options)) {
                        layer.options.urlTemplate = `${TEMPLATE_URL}/${user_name}/api/v1/map/${res.layergroupid}/{z}/{x}/{y}.png`;
                    }
                });
                this.setLibrary(library);
            });
    },

    setLibrary: function (library) {
        this._library = library;
        let factory = LibraryFactory.createFactory(library);
        let { center, zoom } = this._config;
            center = Array.isArray(center) ? center : JSON.parse(center);

        let map = factory.createMap(this._container, { center, zoom }),
            config = this._config;

        if ("layers" in config) {
            for (let i = 0, len = config.layers.length; i < len; i++) {
                map.addLayer(factory.createLayer(config.layers[i]));
            }
        }

        this._map = map;
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
