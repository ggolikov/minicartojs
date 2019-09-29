import AbstractMap from './AbstractMap';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

export default class OpenLayersMap extends AbstractMap {
    constructor(container, options) {
        super(container, options);
            
        let { center, zoom } = options;

        this.libraryMap = new Map({
            view: new View({
                center: fromLonLat(center),
                zoom
            }),
            target: this.container
        });
    }
}