// TODO:: Now we are calling d3 library at head.script in index.html.
// Change it to call the library at here with 'import' declare.

// import * as d3 from "../node_modules/d3/src/index"

export const chart = () => {
    // Declare the chart dimensions and margins.
    const width = 950;
    const height = 500;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;
    
    // Declare the x (horizontal position) scale.
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.mz)]).nice() // just domain with mz array extracted from data array.
        .range([marginLeft, width - marginRight]);
    
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height - marginBottom, marginTop]);
  
    // Create the SVG container.
    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "black")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.mz))
        .attr("y", (d) => y(d.intensity))
        .attr("height", (d) => y(0) - y(d.intensity))
        .attr("width", 1);
  
    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width/50)); // Make ticks per 50 mz increased.
  
    // Add the y-axis and label
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat(d3.format(".1e")))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Intensity"));
  }
  
  var data = [
      {"id":1,"mz":197.0175206309182,"intensity":100},
      {"id":2,"mz":297.0188950281747,"intensity":2000},
      {"id":3,"mz":397.0202694349709,"intensity":300},
      {"id":4,"mz":497.02164385130686,"intensity":400},
      {"id":5,"mz":504.11878753148153,"intensity":500},
  ];