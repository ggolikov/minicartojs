import L from 'leaflet';
import Map from './Map';

export default class LeafletMap extends Map {
    constructor() {
        this._map = L.map();
        return this._map;
    }

    addLayer(layer) {
        this._map.addLayer(layer);    
    }
}