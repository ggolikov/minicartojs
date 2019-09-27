import { MAPS_API_URL, TEMPLATE_URL } from '../constants';

export default class AbstractTileLayer {
    constructor(layerData, map) {
        let { type, options } = layerData;
        
        this.setType(type);
        this.setOptions(options);
        this.setMap(map);
    }

    createLayer() {

    }

    setVisibility() {

    }

    update(options) {
        this.setOptions(options);
        this.redraw();
    }

    redraw() {

    }

    setType(type) {
        this._type = type;
    }

    setOptions(options) {
        this._options = options;
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

    getType() {
        return this._type;
    }

    getOptions() {
        return this._options;
    }

    getUrlTemplate() {
        let map = this.getMap(),
            type = this.getType(),
            options = this.getOptions();

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
                    let mapOptions = map.getOptions(),
                        { maps_api_config } = mapOptions,
                        { user_name } = maps_api_config;

                    options.urlTemplate = `${TEMPLATE_URL}/${user_name}/api/v1/map/${res.layergroupid}/{z}/{x}/{y}.png`;

                    return this;
                });
        }
    }
}
