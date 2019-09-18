import * as OlMap from 'ol/Map';
import View from 'ol/View';
import Map from './Map';

export default class OpenLayersMap extends Map {
    constructor() {
        this._map = new OlMap({
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