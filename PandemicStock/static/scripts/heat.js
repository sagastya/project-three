Plotly.d3.csv('static/data/clean_covid.csv',
  function(err, rows){function unpack(rows, key) {return rows.map(function(row){ return row[key];
})};

var data = [{
  lon: unpack(rows, 'Long_'), lat: unpack(rows, 'Lat'), radius:10,
  z: unpack(rows, 'Confirmed'), type: "densitymapbox", coloraxis: 'coloraxis',
  hoverinfo: 'skip'}];

var layout = {
    mapbox: {center: {lon: -95.71, lat: 37.09}, style: "outdoors", zoom: 3},
    coloraxis: {colorscale: "Viridis"}, title: {text: "Covid-19 Spread"},
    width: 860, height: 500, margin: {t: 30, b: 0}};

var config = {mapboxAccessToken: "pk.eyJ1IjoiYmNoaWxkcmVzczc0IiwiYSI6ImNrN21odDV1ZDBpZnQzZm8wMjB3NG9rejEifQ.lQ2Fv3q-Jwr0-47R2F3-zg"};

Plotly.newPlot('myDiv', data, layout, config);
}) 