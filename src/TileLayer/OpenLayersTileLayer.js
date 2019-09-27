import AbstractTileLayer from './AbstractTileLayer';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

export default class OpenLayersTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);

        return this.redraw();
    }

    createLayer() {
        this._layer = new TileLayer({
            source: new XYZ({
                url: this.getOptions().urlTemplate
            })
        })
    }

    redraw() {
        return this.getUrlTemplate()
            .then(() => {
                let libraryMap = this.getLibraryMap();

                if (this.layerOnMap()) {
                    libraryMap.removeLayer(this.getLibraryLayer());
                    
                    this.getLibraryLayer().setSource(new XYZ({
                        url: this.getOptions().urlTemplate
                    }));
                } else {
                    this.createLayer();
                }

                return this;
            });
    }

    layerOnMap() {
        let libraryMap = this.getLibraryMap(),
            libraryLayers = libraryMap.getLayers().getArray();

        return !!libraryLayers.find(l => l === this.getLibraryLayer());
    }

    setVisibility(visible) {
        this._layer.setVisible(visible);
    }
}