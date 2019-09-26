import LibraryFactory from '../LibraryFactory';
import EventTarget from '../EventTarget';
import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

class MiniCarto extends EventTarget {
    init(config = {}, container, library = 'leaflet') {
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
            
        this.fire('init');
        }
        
    setLibrary(library) {
        this._library = library;
        let factory = LibraryFactory.createFactory(library);
        let { center, zoom } = this._config;
        center = Array.isArray(center) ? center : JSON.parse(center);

        let map = factory.createMap(this._container, { center, zoom }),
            config = this._config;
            
        if ("layers" in config) {
            for (let i = 0, len = config.layers.length; i < len; i++) {
                map.addLayer(factory.createLayer(config.layers[i], map));
            }
        }
        
        this._map = map;
        this.fire('setLibrary');
    }

    getMap() {
        return this._map;
    }

    _requestAPIUrl(config) {
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

export default new MiniCarto();
