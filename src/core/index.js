class MiniCarto {
    constructor(provider) {
        this.providres = [
            'leaflet',
            'openlayers',
        ];

        this.setProvider(provider = this.providres[0]);
    }

    setProvider(provider) {
        console.log(provider);
    }
}

export default MiniCarto;
