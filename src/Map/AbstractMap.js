export default class AbstractMap {
    constructor(container, options) {
        this._layers = new Map();
        this._initialClassName = container.className;
        this._container = this._resetMapContainer(container); 
        this._options = options; 
    }

    get libraryMap() {
        return this._libraryMap;
    }

    get layers() {
        return Array.from(this._layers.keys());
    }

    get options() {
        return this._options;
    }

    get container() {
        return this._container;
    }

    set libraryMap(map) {
        this._libraryMap = map;
    }

    addLayer(layer) {
        if (!this._layers.has(layer)) {
            this._layers.set(layer, null);

            layer.map = this; 
        }
     
        this.libraryMap.addLayer(layer.libraryLayer);
    }

    removeLayer(layer) {
        if (this._layers.has(layer)) {
            this._layers.delete(layer);

            layer.map = null;
        }
    }

    hasLayer(layer) {
        return this._layers.get(layer);
    }

    _resetMapContainer(container) {
        let innerContainer = document.createElement('div');
        
        innerContainer.style = 'width: 100%; height: 100%';
        
        container.innerHTML = '';
        container.appendChild(innerContainer);

        return innerContainer;
    }
}

