import L from 'leaflet';
import TileLayer from './TileLayer';

export default class LeafletTileLayer extends TileLayer {
    constructor() {
        this._layer = L.tileLayer();
        return this._layer;
    }
}