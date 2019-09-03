import createLeafletMap from './createLeafletMap';
import createOlMap from './createOlMap';

const createMap = (elem, config, provider)  => {
    let map;
    console.log(config);
    switch (provider) {
        case 'leaflet':
            map = createLeafletMap(elem, config);
            break;
        case 'ol':
            map = createOlMap(elem, config);
            break;
        default:
    }

    return map;
}

export default createMap;
