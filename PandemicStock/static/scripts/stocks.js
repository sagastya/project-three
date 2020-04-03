function init() {
    // Intialize the dropdown menu item to default - DJI
    var dropdownMenu = d3.select("#selDataset");
    dropdownMenu.node().selectedIndex = 2;
    updatePlotly();
  }
  
  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
  
  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
  
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.node().value;
    console.log(`updatePlotly... ${dataset}`)
  
    // Create plot based on the selected stock
    switch (dataset) {
      case "BA":
        buildBA();
        break;
  
      case "DIS":
        buildDIS();
        break;
  
      case "PG":
        buildPG();
        break;
  
      default:
        buildDJI();
        break;
    }
  
  }
  
  // Create multi-line DOW plot for COVID-19, Swine Flu and Sars timeline
  function buildDJI() {
    console.log("DJI...")
    var days = Object.values(data.Days);
    var sars_dow = Object.values(data.SARS_DOW);
    var swineflu_dow = Object.values(data.SWINEFLU_DOW);
    var covid19_dow = Object.values(data.COVID19_DOW);
  
    // DOW data for SARS - 2003
    var trace1 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: sars_dow,
      name: "2003, SARS",
      line: {
        color: "#058350"
      }
    };
  
    // DOW data for Swine Flu - 2009
    var trace2 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: swineflu_dow,
      name: "2009, SWINE",
      line: {
        color: "#e00070"
      }
    }
  
    // DOW data for COVID-19 - 2020
    var trace3 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: covid19_dow,
      name: "2020, COVID-19",
      line: {
        color: "#0000e0"
      }
    }
  
    // DOW plot data for all 3 pandemics
    var plot_data = [trace1, trace2, trace3];
  
    // Layout for the Plot
    var layout = {
      title: `Pandemic Comparative Impact - Dow Jones (DJI)`,
      xaxis: {
        title: 'Interval - 1D',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Currency in USD',
        showline: false
      },
      // showlegend: false
    };
  
    // Create pandemic DOW Plot
    Plotly.newPlot("plot", plot_data, layout);
  }
  
  // Create multi-line BA plot for COVID-19, Swine Flu and Sars timeline
  function buildBA() {
    console.log("BA...")
    var days = Object.values(data.Days);
    var sars_ba = Object.values(data.SARS_BA);
    var swineflu_ba = Object.values(data.SWINEFLU_BA);
    var covid19_ba = Object.values(data.COVID19_BA);
  
    // BA data for SARS - 2003
    var trace1 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: sars_ba,
      name: "2003, SARS",
      line: {
        color: "#058350"
      }
    };
  
    // BA data for Swine Flu - 2009
    var trace2 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: swineflu_ba,
      name: "2009, SWINE",
      line: {
        color: "#e00070"
      }
    }
     
    // BA data for COVID-19 - 2020
    var trace3 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: covid19_ba,
      name: "2020, COVID-19",
      line: {
        color: "#0000e0"
      }
    }
  
    // BA plot data for all 3 pandemics
    var plot_data = [trace1, trace2, trace3];
  
    // Layout for BA plot
    var layout = {
      title: `Pandemic Comparative Impact - Boeing (BA)`,
      xaxis: {title: 'Interval - 1D'},
      yaxis: {title: 'Currency in USD'},
      showlegend: false
    };
  
    // Create pandemic BA Plot
    Plotly.newPlot("plot", plot_data, layout);
  }
  
  // Create multi-line DIS plot for COVID-19, Swine Flu and Sars timeline
  function buildDIS() {
    console.log("DIS...")
    var days = Object.values(data.Days);
    var sars_dis = Object.values(data.SARS_DIS);
    var swineflu_dis = Object.values(data.SWINEFLU_DIS);
    var covid19_dis = Object.values(data.COVID19_DIS);
  
    // DIS data for SARS - 2003
    var trace1 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: sars_dis,
      name: "2003, SARS",
      line: {
        color: "#058350"
      }
    };
  
    // DIS data for Swine Flu - 2009
    var trace2 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: swineflu_dis,
      name: "2009, SWINE",
      line: {
        color: "#e00070"
      }
    }
  
    // DIS data for COVID-19 - 2020
    var trace3 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: covid19_dis,
      name: "2020, COVID-19",
      line: {
        color: "#0000e0"
      }
    }
  
    // DIS plot data for all 3 pandemics
    var plot_data = [trace1, trace2, trace3];
  
    // Layout for DIS plot
    var layout = {
      title: `Pandemic Comparative Impact - Disney (DIS)`,
      xaxis: {title: 'Interval - 1D'},
      yaxis: {title: 'Currency in USD'},
      showlegend: false
    };
  
    // Create pandemic DIS Plot
    Plotly.newPlot("plot", plot_data, layout);
  }
  
  // Create multi-line PG plot for COVID-19, Swine Flu and Sars timeline
  function buildPG() {
    console.log("PG...")
    var days = Object.values(data.Days);
    var sars_pg = Object.values(data.SARS_PG);
    var swineflu_pg = Object.values(data.SWINEFLU_PG);
    var covid19_pg = Object.values(data.COVID19_PG);
  
    // PG data for SARS - 2003
    var trace1 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: sars_pg,
      name: "2003, SARS",
      line: {
        color: "#058350"
      }
    };
  
    // PG data for Swine Flu - 2009
    var trace2 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: swineflu_pg,
      name: "2009, SWINE FLU",
      line: {
        color: "#e00070"
      }
    }
  
    // PG data for COVID-19 - 2020
    var trace3 = {
      type: "scatter",
      mode: "lines",
      x: days,
      y: covid19_pg,
      name: "2020, COVID-19",
      line: {
        color: "#0000e0"
      }
    }
  
    // PG plot data for all 3 pandemics
    var plot_data = [trace1, trace2, trace3];
  
    // Layout for PG plot
    var layout = {
      title: `Pandemic Comparative Impact - Proctor & Gamble (PG)`,
      xaxis: {title: 'Interval - 1D'},
      yaxis: {title: 'Currency in USD'},
      showlegend: false
    };
  
    // Create pandemic PG Plot
    Plotly.newPlot("plot", plot_data, layout);
  }
  
  // Call the init function
  init();
  
  