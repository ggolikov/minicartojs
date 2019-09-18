import AbstractFactory from './AbstractFactory';
import { LeafletMap } from '../Map';
import { LeafletTileLayer } from '../TileLayer';

export default class LeafletFactory extends AbstractFactory {
    constructor() { 
        super();
    }

    createMap(container, options) { 
        return new LeafletMap(container, options);
    }

    createTileLayer(layerData) {
        return new LeafletTileLayer(layerData.options.urlTemplate);
    }
}
