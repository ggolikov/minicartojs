const config = {
  "center":"[52.5897007687178, 52.734375]",
  "zoom":4,
  "maps_api_config": {
    "user_name": "documentation",
    "maps_api_template": "http://{user}.cartodb.com:80"
  },
  "layers":[
    {
      "type":"tiled",
      "options":{     "urlTemplate":"http://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "minZoom":"0",
        "maxZoom":"18",
        "attribution":"&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
      }
    },
    {
      "type":"CartoDB",
      "options":{
        "sql":"select * from european_countries_e where area <= 10000",
        "cartocss":"/** choropleth visualization */\n\n#european_countries_e{\n  polygon-fill: #FFFFB2;\n  polygon-opacity: 0.8;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 0.5;\n}\n#european_countries_e [ area <= 1638094] {\n   polygon-fill: #B10026;\n}\n#european_countries_e [ area <= 55010] {\n   polygon-fill: #E31A1C;\n}\n#european_countries_e [ area <= 34895] {\n   polygon-fill: #FC4E2A;\n}\n#european_countries_e [ area <= 12890] {\n   polygon-fill: #FD8D3C;\n}\n#european_countries_e [ area <= 10025] {\n   polygon-fill: #FEB24C;\n}\n#european_countries_e [ area <= 9150] {\n   polygon-fill: #FED976;\n}\n#european_countries_e [ area <= 5592] {\n   polygon-fill: #FFFFB2;\n}",
        "cartocss_version":"2.1.1"
      }
    },
    {
      "options": {
        "urlTemplate": "http://c.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
        "minZoom": "0",
        "maxZoom": "18",
        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
      },
      "type": "tiled"
    }
  ],
};

export default config;
