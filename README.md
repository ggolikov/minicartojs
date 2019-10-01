# miniCarto.js

MiniCarto is a mapping abstraction library, written according to [gist](https://gist.github.com/jimartincorral/d936859eaa09db025b9b7e89176a8ffb).
## [Demo](https://ggolikov.github.io/minicartojs)

MiniCarto has three goals:
- it takes configuration file with some properties and renders map and layers using one of popular mapping libraries. At demo page I switch between Leaflet and OpenLayers. The design of miniCarto is abstract enough to easy add new mapping libraries easy (e.g. Google Maps or d3.js). 
- it handles map layers visibility using abstract TileLayer class (all layers in this demo are rendered as tiled layers)
- it updates sql attribute of CartoDB tiled layer and rerenders it.

To test library from console, I expose it at demo page into global namespace as `window.miniCarto`.

## Installation
```
npm install minicarto
```

```javascript
import miniCarto from 'minicarto';

miniCarto.init(...);
```

## Usage

## API reference

### miniCarto

Method|Description
------|-------
init(config `Object`, container `HTML Element`, library `String`)|Initializes miniCarto with params. Reads `config` file, then creates map with layers and draws them in `container` using `library`. Default library is 'leaflet'.
setLibrary(`String`, 'leaflet' \| 'openLayers')|Sets `library`, recreates map with layers and draws them.

### miniCarto.map

Method|Description
------|-------
addLayer(layer `miniCarto.Layer`)| Adds `layer` to the map. Inside adds library layer to library map.
removeLayer(layer `miniCarto.Layer`)| Removes `layer` from the map. Inside removes library layer from the library map.
hasLayer(layer `miniCarto.Layer`)| Checks if map has `layer` already.

### miniCarto.map.layer

Method|Description
------|-------
setVisibility(visible `Boolean`)| Handles layer visibility. 
update(options `Object`)| Updates layer with options. Inside requests layer data and redraws it.
