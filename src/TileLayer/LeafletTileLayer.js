import L from 'leaflet';
import AbstractTileLayer from './AbstractTileLayer';

export default class LeafletTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);

        this._pane = this.libraryMap.createPane('pane');
        
        return this.redraw();
    }
    
    createLayer() {
        this.libraryLayer = L.tileLayer(this.options.urlTemplate, { pane: this._pane });
    }
    
    redraw() {
        return this.getUrlTemplate()
            .then(() => {
                if (this.layerOnMap()) {
                    this.libraryMap.removeLayer(this.libraryLayer);

                    this.createLayer();
                    this.libraryLayer.addTo(this.libraryMap);
                } else {
                    this.createLayer();
                }

                return this;
            });
    }

    layerOnMap() {
        return this.libraryMap.hasLayer(this.libraryLayer);
    }

    setVisibility(visible) {
        this._pane.style.display = visible ? 'block' : 'none';
    }
}