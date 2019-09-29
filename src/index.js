import EventTarget from './EventTarget';
import libraryFactory from './LibraryFactory';

class MiniCarto extends EventTarget {
    get library() {
        return this._library;
    }

    get config() {
        return this._config;
    }

    get map() {
        return this._map;
    }

    get container() {
        return this._container;
    }

    init(config = {}, container, library = 'leaflet') {
        this._container = container;
        this._config = config;
        this.setLibrary(library);
    }

    setLibrary(library) {
        let factory = libraryFactory.createFactory(library),
            { config } = this,
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
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default new MiniCarto();
