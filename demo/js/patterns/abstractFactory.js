'use strict';

class LibraryFactory {
    constructor() {}

    createMap(product) {}

    createLayer(product) {}
}

class LeafletFactory extends LibraryFactory {
    constructor() {
        super();
    }

    createMap(product) {
        return new LeafletMap;
    }

    createLayer(product) {
        return new LeafletLayer;
    }
}

class OlFactory extends LibraryFactory {
    constructor() {
        super();
    }

    createMap(product) {
        return new OlMap();
    }

    createLayer(product) {
        return new OlLayer();
    }
}

class Map {
    constructor() {
    }
}

class Layer {
    constructor() {
    }
}


class LeafletMap extends Map {
    constructor() {
        return L.map();
    }
}

class LeafletLayer extends Layer {
    constructor() {
        super()
        return L.tileLayer();
    }
}

class OlMap extends Map {
    constructor() {
        super()
        return new OL.Map();
    }
}

class OlLayer extends Layer {
    constructor() {
        super()
        return new OL.Layer();
    }
}