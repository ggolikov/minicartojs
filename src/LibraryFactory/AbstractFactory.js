export default class AbstractFactory {
    createLayer(layerData, map) {
        if (layerData.type === 'tiled' || layerData.type === 'CartoDB') {
            return this.createTileLayer(layerData, map);
        }
    }
    
    createMap() {
    
    }
    
    createTileLayer() {

    }
}
