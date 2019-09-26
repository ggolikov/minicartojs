export default class AbstractTileLayer {
    constructor(layerData, map) {
        let { options } = layerData;
        this._options = options;
        this.setMap(map);
    }

    setVisibility() {

    }

    setMap(map) {
        this._map = map;
    }

    getMap() {
        return this._map;
    }
    
    getLibraryMap() {
        return this._map._map;
    }

    getLibraryLayer() {
        return this._layer;
    }
}
