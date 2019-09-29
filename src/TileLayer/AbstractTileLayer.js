import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

export default class AbstractTileLayer {
    constructor(layerData, map) {
        let { type, options } = layerData;
        
        this._type = type;
        this._options = options;
        this._map = map;
        this._options = options;
        this._map = map;
    }

    get map() {
        return this._map;
    }
    
    get libraryMap() {
        return this._map.libraryMap;
    }

    get libraryLayer() {
        return this._libraryLayer;
    }

    get type() {
        return this._type;
    }

    get options() {
        return this._options;
    }
    
    set map(map) {
        this._map = map;
    }

    set libraryLayer(layer) {
        this._libraryLayer = layer;
    }

    set options(options) {
        this._options = options;
    }

    update(options) {
        this.options = options;
        this.redraw();
    }

    getUrlTemplate() {
        let map = this.map,
            type = this.type,
            options = this.options;

        if (type === 'tiled') {
            return Promise.resolve(options.urlTemplate)
        } else if (type === 'CartoDB') {
            let layers = [{
                type: "mapnik",
                options,
            }]

            let requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ layers })
            };

            return fetch(MAPS_API_URL, requestOptions)
                .then(res => res.json())
                .then(res => {
                    let { maps_api_config } = map.options,
                        { user_name } = maps_api_config;

                    options.urlTemplate = `${TEMPLATE_URL}/${user_name}/api/v1/map/${res.layergroupid}/{z}/{x}/{y}.png`;

                    return this;
                });
        }
    }
    
    redraw() {

    }

    createLayer() {

    }

    setVisibility() {

    }
}
