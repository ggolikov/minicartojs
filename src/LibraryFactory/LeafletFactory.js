import AbstractFactory from './AbstractFactory';
import { LeafletMap } from '../Map';
import { LeafletTileLayer } from '../TileLayer';

export default class LeafletFactory extends AbstractFactory {
    createMap(container, options) {
        return new LeafletMap(container, options);
    }

    createTileLayer(layerData, map) {
        return new LeafletTileLayer(layerData, map);
    }
}
