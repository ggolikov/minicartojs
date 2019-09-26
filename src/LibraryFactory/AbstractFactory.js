export default class AbstractFactory {
    constructor() { 

    }

    createMap() {

    }

    createLayer(layerData, map) {
        if (layerData.type === 'tiled' || layerData.type === 'CartoDB') {
            return this.createTileLayer(layerData, map);
        }
    }
}
