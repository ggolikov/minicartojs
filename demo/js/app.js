import miniCarto from '../../src/index.js';
import config from './config.js';
// DEBUG: 
window.miniCarto = miniCarto;
console.log(miniCarto);
let container = document.getElementById('map');

miniCarto.core.init(config, container, 'openLayers');
// console.log(miniCarto);
