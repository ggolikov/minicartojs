import LeafletFactory from './LeafletFactory';
import OpenLayersFactory from './OpenLayersFactory';

const libraries = {
    'leaflet': LeafletFactory,
    'openLayers': OpenLayersFactory
};

class LibraryFactory {
    createFactory(library) {
        const Factory = libraries[library];
        return new Factory(library);
    }
}

export default new LibraryFactory();