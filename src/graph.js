var onLoadCallback = function () {
  var graphs = data;

  // I suggest just binding to the height and width of the containting element
  // this makes it easier to manage things with CSS
  var id         = "#stage";
  var element    = $(id)
  var maxHeight  = element.height();
  var maxWidth   = element.width();
  var graphData = new GraphData(graphs['graphOne'], statuses);

  // establish margins so axes can fit
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = maxWidth,
    height = maxHeight;

  // create the basic svg element everything will hag on
  var stage = d3.select(id)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // make some scales for the axes
  // splits up the width by num of items in domain
  // I think it maps the name passed into range with the one passed into the function
  var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width - margin.left - margin.right], .1)
    .domain(graphData.rangeNames);

  var yScale = d3.scale.linear()
    .range([height - margin.bottom, margin.top])
    .domain([0, graphData.maxRange]);

  // make some axes
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  stage.selectAll("line.horizontalGrid").data(yScale.ticks(graphData.maxRange)).enter()
    .append("line")
      .attr(
      {
        "class":"horizontalGrid",
        "x1" : margin.left,
        "x2" : width - margin.right,
        "y1" : function(d){ return yScale(d);},
        "y2" : function(d){ return yScale(d);},
        "stroke" : "#DEDFE0",
        "shape-rendering" : "crispEdges",
        "stroke-width" : "1px"
      });


  // add the axes
  stage.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
    .attr("fill", '#7F8082')
    .call(xAxis);

  stage.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .attr("fill", '#7F8082')
    .call(yAxis);

  // add ranges to the stage
  var range = stage.selectAll(".range")
    .data(graphData.parsedData)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d, i) { return "translate(" + xScale(i) + ",0)"; });

  // // // add statuses to each range
  range.selectAll("rect")
    .data(function (d) {
      return d.statuses
    })
    .enter().append("rect")
    .attr("width", xScale.rangeBand())
    .attr("x", margin.left)
    .attr("y", function(d) { return yScale(d.y1) })
    .attr("height", function(d) {
      return yScale(d.y0) - yScale(d.y1)
    })
    .style("fill", function(d) { return d.hex });
}

window.addEventListener('load', onLoadCallback, false )
