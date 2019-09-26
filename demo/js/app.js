import miniCarto from '../../src/index.js';
import config from './config.js';

// DEBUG: 
window.miniCarto = miniCarto;
console.log(miniCarto);
let container           = document.getElementById('mapContainer'),
    leafletCheckbox     = document.getElementById('leaflet'),
    openLayersCheckbox  = document.getElementById('openLayers'),
    visibilityContainer = document.getElementById('visibilityContainer');
   
miniCarto.on('setLibrary', createMapLegend);

miniCarto.init(config, container, 'leaflet');

[leafletCheckbox, openLayersCheckbox].forEach(elem => elem.addEventListener('change', setLibrary));

function createMapLegend() {
    visibilityContainer.innerHTML = '';
    config.layers.forEach(updateMapLegend);

    let layer0Checkbox = document.getElementById('0'),
        layer1Checkbox = document.getElementById('1'),
        layer2Checkbox = document.getElementById('2');

    [layer0Checkbox, layer1Checkbox, layer2Checkbox].forEach(elem => elem.addEventListener('change', setLayerVisibility));
}

function updateMapLegend(layerDescription, index) {
    visibilityContainer.innerHTML += `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id=${index} checked>
                <label class="form-check-label" for="${index}">
                    ${layerDescription.type}
            </label>
        </div>
    `;
}

function setLayerVisibility(e) {
    let map = miniCarto.getMap(),
        layers = map.getLayers();

    layers[e.target.id].setVisibility(e.target.checked);
}

function setLibrary(e) {
    e.target.checked && miniCarto.setLibrary(e.target.id);
}




