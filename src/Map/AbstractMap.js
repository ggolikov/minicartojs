export default class AbstractMap {
    constructor(container, options) {
        this._initialClassName = container.className;
        this._container = container; 
        this._options = options; 
        // this._clearContainer();
    }

    _clearContainer() {
        let containerClone = this._container.cloneNode(true);
        containerClone.innerHTML = '';
        console.log(this._initialClassName);
        // containerClone.className = this._initialClassName;
        this._container.parentNode.replaceChild(containerClone, this._container);
        this._container = containerClone;
    }
    // ...common map methods
}

