import LibraryFactory from './LibraryFactory';
import EventTarget from './EventTarget';

class MiniCarto extends EventTarget {
    init(config = {}, container, library = 'leaflet') {
        this._container = container;
        this._config = config;
        this.setLibrary(library);
    }

    setLibrary(library) {
        let factory = LibraryFactory.createFactory(library),
            config = this.getConfig(),
            { center, zoom, maps_api_config } = config;
        
        center = Array.isArray(center) ? center : JSON.parse(center);
        
        let map = factory.createMap(this._container, { center, zoom, maps_api_config });

        let promises = [];
        
        if ("layers" in config) {
            for (let i = 0, len = config.layers.length; i < len; i++) {
                let layerData = config.layers[i];

                promises.push(factory.createLayer(layerData, map));
            }
        }

        Promise.all(promises)
            .then(layers => {
                layers.forEach(layer => map.addLayer(layer));

                this._library = library;
                this._map = map;
                
                this.fire('setLibrary');
            });
    }

    getContainer() {
        return this._container;
    }

    getMap() {
        return this._map;
    }

    getConfig() {
        return this._config;
    }
}

export default new MiniCarto();
