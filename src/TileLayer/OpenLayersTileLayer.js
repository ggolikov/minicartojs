import AbstractTileLayer from './AbstractTileLayer';

export default class OpenLayersTileLayer extends AbstractTileLayer {
    constructor(url) {
        super(url);
        this._layer = {};
        return this._layer;
    }
}