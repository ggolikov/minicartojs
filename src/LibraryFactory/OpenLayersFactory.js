import AbstractFactory from './AbstractFactory';
import { OpenLayersMap } from '../Map';
import { OpenLayersTileLayer } from '../TileLayer';

export default class OpenLayersFactory extends AbstractFactory {
    createMap(container, options) {
        return new OpenLayersMap(container, options);
    }

    createTileLayer(layerData, map) {
        return new OpenLayersTileLayer(layerData, map);
    }
}
