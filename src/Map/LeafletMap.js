import L from 'leaflet';
import AbstractMap from './AbstractMap';

export default class LeafletMap extends AbstractMap {
    constructor(container, options) {
        super();
        this._map = L.map(container, options);
        return this._map;
    }

    addLayer(layer) {
        this._map.addLayer(layer);    
    }
}