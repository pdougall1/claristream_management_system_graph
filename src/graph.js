var Graph = function (graphData, dimensions) {
  this.graphData  = graphData;
  this.dimensions = dimensions;

  // create the basic svg element everything will hag on
  this.addStage = function () {
    this.stage = d3.select(this.dimensions.selector)
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)
  }

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
    this.yAxisOnStage = this.stage.append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + this.dimensions.leftMargin + ",0)")
      .attr("fill", '#7F8082')
      .call(this.yAxis);
  }

  this.addHorizontalGridLines = function () {
    this.horizontalGridlines = new HorizontalGridlines(this.stage,
                                            this.graphData,
                                            this.dimensions,
                                            this.yScale);
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

    this.statusBars = this.ranges.selectAll("rect")
      .data(function (d) { return d.statuses })
      .enter().append("rect")
      .attr("width", xScale.rangeBand())
      .attr("x", this.dimensions.leftMargin)
      .attr("y", function(d) { return yScale(d.y1) })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) })
      .style("fill", function(d) { return d.hex });
  }

  this.build = function () {
    this.addStage();
    this.setScales();
    this.setAxes();
    this.addXAxis();
    this.addYAxis();
    this.addHorizontalGridLines();
    this.addRanges();
    this.addStatusesToEachRange();
    this.setDataUpdatedCallback();
  }

  // ____________________________________________________________
  // update graph when data is updataed
  // ultimately this should be handled with transitions

  this.updataData = function(newGraphData) {
    var graphData = this.setNewData(newGraphData);
    this.setScales();
    var yScale = this.yScale;

    this.statusBars = this.ranges.selectAll("rect")
      .data(function (d, i) { return graphData.parsedData[i].statuses })
      .transition()
      .attr("y", function(d) { return yScale(d.y1) })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) });

    this.yAxisOnStage
      .transition()
      .call(this.yAxis.scale(yScale));

    this.horizontalGridlines.update(graphData);
  }

  this.setDataUpdatedCallback = function () {
    var _this = this;
    this.graphData.setDataUpdatedCallback(function (newGraphData) {
      _this.updataData(newGraphData);
    });
  }

  this.setNewData = function (newData) {
    this.graphData = newData;
    this.setDataUpdatedCallback();
    return newData;
  }
  // ____________________________________________________________

  this.build();
}
