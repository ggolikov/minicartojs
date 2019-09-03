Goals
Your mission is to write a little JS library (a mini version of CartoDB.js) that reads a config file describing a map and:

Renders the map using one of the available mapping libraries (Leaflet, OpenLayers, Google Maps, d3.js… you choose!).
Exposes an API to: 2.1. Show / hide any of the map layers. 2.2. Update the “sql” attribute of CartoDB layers that are rendered by Maps API.
This is quite a lot of work, but we think it’s interesting! There’s no time limit for this test. We know you probably have a busy life, so please, do as much as you possible can! And please, don’t let the scope of this test push you back. If you can only finish goal #1, it’s totally okay!

Нужно написать небольшую библиотеку на js, которая читает конфигурационный файл, описывающий карту и рендерит ее, используя какой-либо картографический движок (Leaflet, OpenLayers). По сути пишем обертку/адаптер для картографических библиотек.

Дополнительно предоставляет API:
отобразить/скрыть слой
Обновить атрибут sql слоя CartoDB.

Конфигурационный файл:

```
{
  // new Map();
  // map.setCenter();
  "center":"[52.5897007687178, 52.734375]",
  // map.setZoom();
  "zoom":4,
  "maps_api_config": {
    "user_name": "documentation",
    "maps_api_template": "http://{user}.cartodb.com:80"
  },
  "layers":[
    {
      "type":"tiled",
      "options":{     "urlTemplate":"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "minZoom":"0",
        "maxZoom":"18",
        "attribution":"&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
      }
    },
    {
      "type":"CartoDB",
      "options":{
        "sql":"select * from european_countries_e",
        "cartocss":"/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}",
        "cartocss_version":"2.1.1"
      }
    },
    {
      "options": {
        "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
        "minZoom": "0",
        "maxZoom": "18",
        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
      },
      "type": "tiled"
    }
  ],
}
```

1. Определяем наборы провайдеров
2. Определяем наборы классов, которые нам нужны - Map,
3. Определяем базовый класс, который будет инициализировать фабрику

1. читаем конфиг, генерируем классы
2. генерируем классы, читаем конфиг, определяем параметры карты и слоев


Конфиг содержит следующие классы:

Класс | Leaflet | OpenLayers |
--|--|--
Map | L.Map |
Layer | L.TileLayer |

Интерфейс базового класса

метод | параметры | описание |
--|--|--
constructor |  | должен инициализировать список провайдеров и текущий провайдер
init | config | читает конфигурационный файл
setProvider |  | должен приводить к полной перерисовке карты
getProvider |
