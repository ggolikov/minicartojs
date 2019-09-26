import L from 'leaflet';
import AbstractTileLayer from './AbstractTileLayer';

export default class LeafletTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);

        let libraryMap = this.getLibraryMap(),
            pane = libraryMap.createPane('pane');

        this._layer = L.tileLayer(this._options.urlTemplate, {pane});
    }

    setVisibility(visible) {
        this._layer.getPane().style.display = visible ? 'block' : 'none';
    }
}