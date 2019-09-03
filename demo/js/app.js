import MiniCarto from '../../src/index.js';
import config from './config.js';
let miniCarto = new MiniCarto();
window.miniCarto = miniCarto;

let container = document.getElementById('map');

miniCarto.init(container, config);
console.log(miniCarto);
