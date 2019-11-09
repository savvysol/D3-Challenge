// Woodall Code Getting Started

// Setting up our Chart Area
var svgHeight = 800;
var svgWidth = 1200;

var margin = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 100
  };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
.select("body")
.append("svg")
.attr("name","main-svg")
.attr("width", svgWidth)
.attr("height", svgHeight)
.attr("id","scatter")
.classed('col-xs-12 col-md-12',true)


var chartGroup = svg.append("g")
    .attr('name','scatter-chart')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr('background-color','grey');


// Importing the Data
d3.csv("assets/data/data.csv").then(function(data,error) {
    
    if (error) throw error;
    
    // Testing the Data Capture
    // data.forEach((d,i) => console.log(`${i} - ${d.state}`)) // end forEach
    for (var i = 0; i < 3; i++) {
        console.log(data[i].state)
    }; // end for Loop


    // Formatting the Data
    data.forEach(function(d,i){

        d.age = +d.age
        d.smokes = +d.smokes

    }); // end Formatting Data

    // Map the data to their own array
    var age = data.map(d => d.age)
    var smokes = data.map(d => d.smokes)

    // Creating the X & Y Scales
    
        // Creating X1 Axis, Scale & Group
        var xAgeScale = d3.scaleLinear()
            .domain([d3.min(age)*.9,d3.max(age)*1.1])
            .range([0,width])

        var bottomAxis = d3.axisBottom(xAgeScale)
        
        // Add bottomAxis
        chartGroup.append("g")
            .attr("name","bottom-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // Creating Y1 Axis, Scale & Group
        var ySmokesScale = d3.scaleLinear()
        .domain([d3.min(smokes)*.9,d3.max(smokes)*1.1])
        .range([height,0])

         var leftAxis = d3.axisLeft(ySmokesScale)
         
         // Add bottomAxis
         chartGroup.append("g")
            .attr("name","left-axis")
            .call(leftAxis);

    // Create the Circles for Scatter

    var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 10])
    // .html(function(d) { return "Radius: " + d.abbr; });
    .html(d => `
    <h6>${d.state}</h6>
    <p> Age: ${d.age}
    <p> Smokes: ${d.smokes}
    `)

    svg.call(tool_tip)

    var chartCircles = chartGroup.append('g').attr('name','circlesGroup')
    var chartLabels = chartGroup.append('g').attr('name','circlesLabels')

    var circlesGroup = chartCircles.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx',d => xAgeScale(d.age))
        .attr('cy',d => ySmokesScale(d.smokes))
        .attr('r',d => d.smokes^2)
        .attr('fill','grey')
        .attr('stroke','red')
        .attr('stroke-width',.5)
        .attr('opacity','.8')
        .on('mouseover',tool_tip.show)
        .on('mouseout',tool_tip.hide)

    var offset = .995
            
    var circleLabels = chartLabels.selectAll('text')
        .data(data).enter().append('text')
        .text(d => d.abbr)
        .attr('x',d => xAgeScale(d.age*offset))
        .attr('y',d => ySmokesScale(d.smokes*offset))
        .style("font-size", "9px")
        .style('font-weight','bold')
        .style("text-anchor", "bottom")
        .style('fill', 'black')

        
    
    

    // var tool_tip = d3.tip()
    //     .attr("class", "d3-tip")
    //     .offset([-8, 0])
    //     .html(function(d) { return "Radius: " + d.abbr; });
    
    // circlesGroup.call(tool_tip);

    // circlesGroup.on('mouseover', function(data) {
    //     toolTip.style("display", "block")
    //       .html(`<h6>${data.abbr}</h6>`)
    //       .style("left", d3.event.pageX + "px")
    //       .style("top", d3.event.pageY + "px")
    //       .on('mouseover',tool_tip.show)
    //       .on('mouseout',tool_tip.hide)

    // }); // end mouseover


        
    






}); // end D3.CSV





