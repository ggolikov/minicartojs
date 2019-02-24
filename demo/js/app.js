import { miniCarto } from '../../src/index.js';
import config from './config.js';
import L from 'leaflet';

window.miniCarto = miniCarto;
console.log(miniCarto);

let map = new miniCarto.Map(config);

console.log(map);
