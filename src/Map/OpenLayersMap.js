import AbstractMap from './AbstractMap';
import Map from 'ol/Map';
import View from 'ol/View';

export default class OpenLayersMap extends AbstractMap {
    constructor() {
        super();
        this._map = new Map({
            // target,
            // view: new View({
                // center,
                // zoom
            // })
        });
            return this._map;
    }

    addLayer(layer) {
        this._map.addLayer(layer);
    }
}