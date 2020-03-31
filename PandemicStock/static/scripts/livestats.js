//Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection




//Define linear scale for output
var color = d3.scaleLinear()
    .range(['#FEC44F', '#FEE391', '#FE9929', '#EC7014', '#CD4C00', '#993404']);

var legendText = [{
        "text": "0-1000",
        "color": '#FEE391'
    },
    {
        "text": "1001-2000",
        "color": '#FEC44F'
    },
    {
        "text": "2001-3000",
        "color": '#FE9929'
    },
    {
        "text": "3001-4000",
        "color": '#EC7014'
    },
    {
        "text": "4001-5000",
        "color": '#CD4C00'
    },
    {
        "text": "5001+",
        "color": '#993404'
    }
];

//Create SVG element and append map to the SVG
var svg = d3.select("#myDiv")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var mapGroup = svg.append("g")

var toolTip = d3.select("#myDiv").insert('div')
    .attr("class", "tool-tip");
// Load in my states data!
d3.json("https://corona.lmao.ninja/states").then(function (data) {
    //color.domain(d3.extent(data.cases)); // setting the range of the input data
    var caseCount = [];

    function getDomain(d) {
        return d > 5000 ? 5 :
            d > 4000 ? 4 :
            d > 3000 ? 3 :
            d > 2000 ? 2 :
            d < 1000 ? 1 :
            0;
    }
    // Load GeoJSON data and merge with states data
    d3.json("static/data/us-states.json").then(function (json) {

        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {

            // Grab State Name
            var dataState = data[i].state;

            // Grab data value 
            var dataValue = data[i].cases;

            var toolTip = `<div class="stateInfo">
                                    <div class="state">${data[i].state}</div> 
                                    <div class="property">Total Cases:</div><div class="value"> ${data[i].cases}</div> 
                                    <div class="property">New Cases:</div><div class="value"> ${data[i].todayCases}</div> 
                                    <div class="property">Total Deaths:</div><div class="value"> ${data[i].deaths}</div> 
                                    <div class="property">New Deaths:</div><div class="value"> ${data[i].todayDeaths}</div> 
                                    </div> `


            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {
                    caseCount.push(getDomain(dataValue));
                    // Copy the data value into the JSON
                    json.features[j].properties.caseCount = dataValue;
                    json.features[j].properties.toolTip = toolTip;
                    json.features[j].properties.color = getDomain(dataValue);
                    // Stop looking through the JSON
                    break;
                }
            }
        }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) {

                // Get data value
                var d = d.properties.caseCount;

                if (d) {
                    var stateColor = d > 5000 ? '#993404' :
                        d > 4000 ? '#CD4C00' :
                        d > 3000 ? '#EC7014' :
                        d > 2000 ? '#FE9929' :
                        d > 1000 ? '#FEC44F' :
                        '#FEE391';

                    return stateColor;
                } else {
                    //If value is undefined…
                    return '#FEE391';
                }
            })
            .on("mouseover", function (d, i) {
                var toolTip = d3.select(".tool-tip");
                toolTip.style("display", "block");
                toolTip.html(d.properties.toolTip)
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
            })
            //Step 3: Add an onmouseout event to make the tooltip invisible
            .on("mouseout", function () {
                var toolTip = d3.select(".tool-tip");
                toolTip.style("display", "none");
            });


        // // Map the cities I have lived in!
        d3.json("https://corona.lmao.ninja/jhucsse").then(function (data) {

            var usfiltered = data.filter(a => a.country == "US");
            var deaths = usfiltered.filter(a => a.stats.deaths > 0)
            deaths = deaths.filter(a => a.coordinates.longitude != "0.0")
            deaths = deaths.filter(a => a.coordinates.latitude != "0.0")
            deaths = deaths.filter(a => a.city !== null)
            deaths.sort(function (x, y) {
                return d3.ascending(x.stats.deaths, y.stats.deaths);
            })
            svg.selectAll("circle")
                .data(deaths)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection([d.coordinates.longitude, d.coordinates.latitude])[0];
                })
                .attr("cy", function (d) {
                    return projection([d.coordinates.longitude, d.coordinates.latitude])[1];
                })
                .attr("r", function (d) {
                    return Math.sqrt(d.stats.deaths);
                })
                .style("fill", "rgb(217,255,255)")
                .style("opacity", 0.50)
                .style("stroke-width", 1)
                .style("stroke", "rgb(0.0.0.0)")
        });


        var myDomain = color.domain();
        // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
        var legend = d3.select("#myDiv").append("svg")
            .attr("class", "legend")
            .attr("width", 140)
            .attr("height", 400)
            .selectAll("g")
            .data(legendText)
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) {
                return d.color;
            });

        legend.append("text")
            .data(legendText)
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.text;
            });
    });

});