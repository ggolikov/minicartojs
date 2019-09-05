import miniCarto from '../../src/index.js';
import config from './config.js';
window.miniCarto = miniCarto;
console.log(miniCarto);
let container = document.getElementById('map');

miniCarto.core.init(config, container, 'ol');
// console.log(miniCarto);
