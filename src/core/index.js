import createMap from '../map';

class MiniCarto {
    constructor(provider) {
        this.providers = [
            'leaflet',
            'ol',
        ];
    }

    init(config, elem, provider) {
        this.elem = elem;
        this._initialClassName = elem.className;
        this.config = config;
        this.setProvider(provider = 'leaflet');
    }

    setProvider(provider) {
        // clear elem
        let elem = this.elem;
        console.log(elem);
        let elemClone = elem.cloneNode(true);
        // console.log(elemClone);
        elemClone.innerHTML = '';
        elemClone.className = this._initialClassName;
        // elem.parentNode.appendChild(elemClone);
        // elem.parentNode.insertBefore(elemClone, elem);
        // elem.parentNode.removeChild(elem);
        elem.parentNode.replaceChild(elemClone, elem);
        // elem.className = '';
        console.log(elemClone);
        this.elem = elemClone;

        console.log(provider);
        let { center, zoom } = this.config;
        this.provider = provider;
        center = Array.isArray(center) ? center : JSON.parse(center);
        this.map = createMap(this.elem, { center, zoom }, this.provider);
        // console.log(this.map);
    }
}

export default MiniCarto;
