import L from 'leaflet';
import AbstractMap from './AbstractMap';

export default class LeafletMap extends AbstractMap {
    constructor(container, options) {
        super(container, options);
        this.libraryMap = L.map(this.container, options);
    }
}