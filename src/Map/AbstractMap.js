export default class AbstractMap {
    constructor(container, options) {
        this._layers = new Map();
        this._initialClassName = container.className;
        this._container = this._resetMapContainer(container); 
        this._options = options; 
    }

    addLayer(layer) {
        if (!this._layers.has(layer)) {
            this._layers.set(layer, null);

            layer.setMap(this); 
        }
    }

    removeLayer(layer) {
        if (this._layers.has(layer)) {
            this._layers.delete(layer);

            layer.setMap(null);
        }
    }

    getLayers() {
        return Array.from(this._layers.keys());
    }

    _resetMapContainer(container) {
        let innerContainer = document.createElement('div');
        
        innerContainer.style = 'width: 100%; height: 100%';
        
        container.innerHTML = '';
        container.appendChild(innerContainer);

        return innerContainer;
    }
}

