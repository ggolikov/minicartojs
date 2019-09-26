import L from 'leaflet';
import AbstractTileLayer from './AbstractTileLayer';

export default class LeafletTileLayer extends AbstractTileLayer {
    constructor(layerData) {
        super(layerData);
        this._layer = L.tileLayer(this._options.urlTemplate);
    }
}