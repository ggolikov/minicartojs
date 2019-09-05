import createLeafletMap from './createLeafletMap';
import createOlMap from './createOlMap';

class Map {
    constructor(container, options, provider) {
        let map;
        switch (provider) {
            case 'leaflet':
                map = createLeafletMap(container, options);
                break;
            case 'ol':
                map = createOlMap(container, options);
                break;
            default:
        }

        this._provider = provider;
        this._map = map;
    }

    addLayer(layer) {
        console.log(layer);
        this._map.addLayer(layer);
    }
}

export { Map };

export default createMap;
