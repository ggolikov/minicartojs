import L from 'leaflet';
import AbstractMap from './AbstractMap';

export default class LeafletMap extends AbstractMap {
    constructor(container, options) {
        super(container, options);
        this._map = L.map(this._container, options);
    }

    addLayer(layer) {
        super.addLayer(layer);
        this._map.addLayer(layer._layer);    
    }
}