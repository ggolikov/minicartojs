class Layer {
    constructor(layerData, provider) {
        let layer;
        switch (provider) {
            case 'leaflet':
                layer = L.tileLayer(layerData.options.urlTemplate);
                break;
            case 'ol':
                layer = {};
                break;
            default:
        }

        return layer;
        //
        // this._provider = provider;
        // this._map = map;
    }
}

export { Layer };
