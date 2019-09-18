import L from 'leaflet';
import AbstractTileLayer from './AbstractTileLayer';

export default class LeafletTileLayer extends AbstractTileLayer {
    constructor(url) {
        super(url);
        this._layer = L.tileLayer(url);
        return this._layer;
    }
}