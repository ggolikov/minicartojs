import AbstractTileLayer from './AbstractTileLayer';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

export default class OpenLayersTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);

        return this.redraw();
    }

    createLayer() {
        this.libraryLayer = new TileLayer({
            source: new XYZ({
                url: this.options.urlTemplate
            })
        })
    }

    redraw() {
        return this.getUrlTemplate()
            .then(() => {
                if (this.layerOnMap()) {
                    this.libraryLayer.setSource(new XYZ({
                        url: this.options.urlTemplate
                    }));
                } else {
                    this.createLayer();
                }

                return this;
            });
    }

    layerOnMap() {
        let { libraryMap } = this,
            libraryLayers = libraryMap.getLayers().getArray();

        return !!libraryLayers.find(l => l === this.libraryLayer);
    }

    setVisibility(visible) {
        this.libraryLayer.setVisible(visible);
    }
}