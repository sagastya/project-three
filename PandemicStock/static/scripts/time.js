/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    6.7 - Adding a jQuery UI slider
 */

var margin = {
    left: 80,
    right: 20,
    top: 50,
    bottom: 100
};
var height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right,
    myDelay = 500;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left +
        ", " + margin.top + ")");

var time = 0;
var interval;
var formattedData;

// Tooltip
var tip = d3.tip().attr('class', 'd3-tip')
    .html(function (d) {
        var text = "<strong>Country:</strong> <span style='color:red'>" + d.country + "</span><br>";
        text += "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
        text += "<strong>Deaths <span style='color:red'>" + d.deaths + "</span><br>";
        text += "<strong>Cases</strong> <span style='color:red'>" + d.cases + "</span><br>";
        text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
        return text;
    });
g.call(tip);

// Scales
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, 164620]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 11591]);

var area = d3.scaleLinear()
    .range([25 * Math.PI, 1500 * Math.PI])
    .domain([2000, 1400000000]);

var continentColor = d3.scaleOrdinal(d3.schemePastel1);

// Labels
var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Cases");
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -170)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Deaths")
var timeLabel = g.append("text")
    .attr("y", height - 10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("Day 0");

// X Axis
var xAxisCall = d3.axisBottom(x)
    .tickValues(d3.range(0, 170000, 20000))

g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickFormat(function (d) {
        return +d;
    });

g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

var continents = ["europe", "asia", "americas", "africa"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width - 10) +
        "," + (height - 125) + ")");

continents.forEach(function (continent, i) {
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 20) + ")");

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", continentColor(continent.toLowerCase()));

    legendRow.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "end")
        .style("text-transform", "capitalize")
        .text(continent);
});

d3.csv("static/data/covid-data.csv").then(function (data) {
     console.log(data);


    var databyDate = d3.nest()
        .key(function (d) {
            return d.date;
        })
        .entries(data);

    console.log(databyDate);
     Clean data
    formattedData = databyDate.map(function (data) {
        // console.log(data);
        var myDate = data["values"].filter(
            function (country) {
                // console.log(country);
                var dataExists = (+country.cases > 0);

                return dataExists
            }
        ).map(
            function (country) {
                country.cases = +country.cases;
                country.deaths = +country.deaths;

                return country;
            })

        return myDate;


    });

    // First run of the visualization
    update(formattedData[0]);

})

$("#play-button")
    .on("click", function () {
        var button = $(this);
        if (button.text() == "Play") {
            button.text("Pause");
            interval = setInterval(step, myDelay);
        } else {
            button.text("Play");
            clearInterval(interval);
        }
    })

$("#reset-button")
    .on("click", function () {
        time = 0;
        update(formattedData[0]);
    })

$("#continent-select")
    .on("change", function () {
        update(formattedData[time]);
    })

$("#date-slider").slider({
    max: 91,
    min: 0,
    step: 1,
    slide: function (event, ui) {
        time = ui.value;
        update(formattedData[time]);
    }
})

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function step() {
    // At the end of our data, loop back
    time = (time < 91) ? time + 1 : 0
    sleep(myDelay).then(() => {
        // Do something after the sleep!
        update(formattedData[time]);
    });
}

function update(data) {
    // Standard transition time for the visualization
    var t = d3.transition()
        .duration(150);

    var continent = $("#continent-select").val();

    var data = data.filter(function (d) {
        if (continent == "all") {
            return true;
        } else {
            return d.continent.toLowerCase() == continent.toLowerCase();
        }
    })

    // JOIN new data with old elements.
    var circles = g.selectAll("circle").data(data, function (d) {
        return d.country;
    });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr("class", "exit")

        .remove();

    // ENTER new elements present in new data.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function (d) {
            return continentColor(d.continent.toLowerCase());
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .merge(circles)

        .transition(t)
        .attr("cx", function (d) {
            return x(+d.cases)
        })
        .attr("cy", function (d) {
            return y(+d.deaths);
        })
        .attr("r", function (d) {
            return Math.sqrt(area(+d.population / 3) / Math.PI)
        });

    // Update the time label
    timeLabel.text("Day " + time)
    $("#year")[0].innerHTML = time

    $("#date-slider").slider("value", +(time))
}