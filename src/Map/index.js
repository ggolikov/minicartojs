import { LibraryProvider } from '../LibraryProvider';

export class Map {
    constructor(mapConfig, libraryType = 'Leaflet') {
        this._library = new LibraryProvider(libraryType);
        console.log(this._library);

        this._readConfig(mapConfig);
    }

    _readConfig(config) {
        console.log(config);
    }
}
