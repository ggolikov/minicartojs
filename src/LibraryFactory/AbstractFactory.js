export default class AbstractFactory {
    createMap(container, options) {
    
    }
    
    createLayer(layerData, map) {
        if (layerData.type === 'tiled' || layerData.type === 'CartoDB') {
            return this.createTileLayer(layerData, map);
        }
    }


    createTileLayer() {

    }
}
