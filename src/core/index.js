import createMap from '../map';

class MiniCarto {
    constructor(provider) {
        this.providers = [
            'ol',
            'leaflet',
        ];

        this.setProvider(provider = this.providers[0]);
    }

    init(elem, config) {
        let { center, zoom } = config;
        this.elem = elem;
        this.config = config;
        // HACK
        center = Array.isArray(center) ? center : JSON.parse(center);
        this.map = createMap(elem, { center, zoom }, this.provider);
        console.log(this.map);
    }

    setProvider(provider) {
        this.provider = provider;

        // this._init()
    }
}

export default MiniCarto;
