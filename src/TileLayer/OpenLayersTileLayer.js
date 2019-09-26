import AbstractTileLayer from './AbstractTileLayer';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

export default class OpenLayersTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);
        this._layer = new TileLayer({
            source: new XYZ({
                url: this._options.urlTemplate
            })
        })
    }
}