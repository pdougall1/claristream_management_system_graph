var Graph = function (graphData, dimensions) {
  this.graphData  = graphData;
  this.dimensions = dimensions;

  // create the basic svg element everything will hag on
  this.stage = d3.select(this.dimensions.selector)
    .append("svg")
    .attr("width", this.dimensions.width)
    .attr("height", this.dimensions.height)

  this.setScales = function () {
    this.xScale = d3.scale.ordinal()
      .rangeRoundBands([0, this.dimensions.innerWidth], .1)
      .domain(this.graphData.rangeNames);

    this.yScale = d3.scale.linear()
      .range([this.dimensions.topGraphHeight, this.dimensions.topMargin])
      .domain([0, this.graphData.maxRange]);
  }

  this.setAxes = function () {
    this.xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient("bottom");

    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient("left");
  }

  this.addXAxis = function () {
    this.stage.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(" + this.dimensions.leftMargin + "," + (this.dimensions.topGraphHeight) + ")")
      .attr("fill", '#7F8082')
      .call(this.xAxis);
  }

  this.addYAxis = function () {
    this.stage.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + this.dimensions.leftMargin + ",0)")
      .attr("fill", '#7F8082')
      .call(this.yAxis);
  }

  this.addHorizontalGridLines = function () {
    var yScale = this.yScale;
    this.horizontalGridLines = this.stage.selectAll("line.horizontalGrid")
      .data(yScale.ticks(graphData.maxRange))
      .enter().append("line")
      .attr("class", "horizontalGrid")
      .attr("x1", this.dimensions.leftMargin)
      .attr("x2", this.dimensions.leftGraphWidth)
      .attr("y1", function(d){ return yScale(d);})
      .attr("y2", function(d){ return yScale(d);})
      .attr("stroke", "#DEDFE0")
      .attr("shape-rendering", "crispEdges")
      .attr("stroke-width", "1px");
  }

  this.addRanges = function () {
    var xScale = this.xScale;
    this.ranges = this.stage.selectAll(".range")
      .data(this.graphData.parsedData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d, i) { return "translate(" + xScale(i) + ",0)"; });
  }

  this.addStatusesToEachRange = function () {
    var xScale = this.xScale;
    var yScale = this.yScale;

    this.ranges.selectAll("rect")
      .data(function (d) { return d.statuses })
      .enter().append("rect")
      .attr("width", xScale.rangeBand())
      .attr("x", dimensions.leftMargin)
      .attr("y", function(d) { return yScale(d.y1) })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) })
      .style("fill", function(d) { return d.hex });
  }

  this.setScales();
  this.setAxes();
  this.addXAxis();
  this.addYAxis();
  this.addHorizontalGridLines();
  this.addRanges();
  this.addStatusesToEachRange();
}
