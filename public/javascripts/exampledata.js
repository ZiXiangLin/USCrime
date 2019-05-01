(function() {

  var basemaps = {
    Grayscale: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    Streets: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  };

  var groups = {
    cities: new L.LayerGroup(),
    restaurants: new L.LayerGroup(),
    dogs: new L.LayerGroup(),
    cats: new L.LayerGroup()
  };

  L.marker([43.67, -70.26]).bindPopup('波特兰，缅因').addTo(groups.cities);
  L.marker([44.47, -73.21]).bindPopup('伯灵顿, 福蒙特').addTo(groups.cities);
  L.marker([42.99, -71.45]).bindPopup('曼彻斯特, 新罕布什尔').addTo(groups.cities);
  L.marker([36.85, -76.28]).bindPopup('诺福克，弗吉尼亚').addTo(groups.cities);
  L.marker([38.25, -85.76]).bindPopup('路易威尔, 肯塔基').addTo(groups.cities);

  L.marker([61.21, -149.88]).bindPopup('安克拉治，阿拉斯加').addTo(groups.restaurants);
  L.marker([35.11, -106.61]).bindPopup('阿布奎基，新墨西哥').addTo(groups.restaurants);
  L.marker([36.16, -86.78]).bindPopup('纳什维尔，田纳西').addTo(groups.restaurants);
  L.marker([29.96, -90.05]).bindPopup('新奥尔良，路易斯安娜').addTo(groups.restaurants);
  L.marker([36.11, -115.17]).bindPopup('拉斯维加斯，内华达').addTo(groups.restaurants);


  window.ExampleData = {
    LayerGroups: groups,
    Basemaps: basemaps
  };

}());
