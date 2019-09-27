import L from 'leaflet';
import AbstractTileLayer from './AbstractTileLayer';

export default class LeafletTileLayer extends AbstractTileLayer {
    constructor(layerData, map) {
        super(layerData, map);
        
        let libraryMap = this.getLibraryMap();

        this._pane = libraryMap.createPane('pane');
        
        return this.redraw();
    }
    
    createLayer() {
        this._layer = L.tileLayer(this.getOptions().urlTemplate, { pane: this._pane });
    }
    
    redraw() {
        return this.getUrlTemplate()
            .then(() => {
                let libraryMap = this.getLibraryMap();
                if (this.layerOnMap()) {
                    libraryMap.removeLayer(this.getLibraryLayer());

                    this.createLayer();
                    this.getLibraryLayer().addTo(libraryMap);
                } else {
                    this.createLayer();
                }
                return this;
            });
    }

    layerOnMap() {
        let libraryMap = this.getLibraryMap();
        return libraryMap.hasLayer(this.getLibraryLayer());
    }

    setVisibility(visible) {
        this._pane.style.display = visible ? 'block' : 'none';
    }

    setSQLAttribute() {

    }
}