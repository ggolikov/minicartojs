import L from 'leaflet';
import AbstractMap from './AbstractMap';

export default class LeafletMap extends AbstractMap {
    constructor(container, options) {
        super(container, options);
        this._map = L.map(container, options);
        console.log(this._options);
        return this._map;
    }

    addLayer(layer) {
        this._map.addLayer(layer);    
    }
}