import AbstractFactory from './AbstractFactory';
import { OpenLayersMap } from '../Map';
import { OpenLayersTileLayer } from '../TileLayer';

export default class OpenLayersFactory extends AbstractFactory {
    constructor() { 
        super();
    }

    createMap(container, options) {
        return new OpenLayersMap(container, options);
    }

    createTileLayer(layerData) {
        return new OpenLayersTileLayer(layerData);
    }
}
