import Map from 'ol/Map';
import View from 'ol/View';

const createOlMap = (target, options)  => {
    const { center, zoom } = options;
    return new Map({
        target,
        view: new View({
            center,
            zoom
        })
    });
}


    

export default createOlMap;
