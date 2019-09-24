import AbstractMap from './AbstractMap';
import Map from 'ol/Map';
import View from 'ol/View';

export default class OpenLayersMap extends AbstractMap {
    constructor(container, options) {
        super(container, options);
        
        let { center, zoom } = options;
        this._map = new Map({
            container,
            view: new View({
                center,
                zoom
            })
        });
        
        return this._map;
    }

    addLayer(layer) {
        this._map.addLayer(layer);
    }
}