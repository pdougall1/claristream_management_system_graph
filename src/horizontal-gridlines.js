var HorizontalGridlines = function (stage, graphData, dimensions, yScale, config) {
  this.stage = stage;
  this.graphData = graphData;
  this.dimensions = dimensions;
  this.yScale = yScale;
  this.config = config;
  this.selector = "line.horizontalGrid";
  this.gridlinesGroup = this.stage.append('g')
  this.gridlines = this.gridlinesGroup.selectAll(this.selector);

  this.update = function (newData) {
    var yScale = this.yScale.domain([0, newData.maxRange]);
    var data = yScale.ticks(newData.maxRange)
    this.gridlines = this.gridlines.data(data);

    this.gridlines.attr("class", "horizontalGrid")
      .transition()
        .delay(this.config.duration / 3)
        .duration(this.config.duration / 3)
        .attr("y1", function(d){ return yScale(d);})
        .attr("y2", function(d){ return yScale(d);})

    this.gridlines.enter().append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", this.dimensions.leftMargin)
        .attr("x2", this.dimensions.leftGraphWidth)
        .attr("y1", function(d){ return yScale(d);})
        .attr("y2", function(d){ return yScale(d);})
        .attr("stroke", "#DEDFE0")
        .attr("shape-rendering", "crispEdges")
        .attr("stroke-width", "1px")
        .style("opacity", 0)
      .transition()
        .delay((this.config.duration / 3) * 2)
        .duration(this.config.duration / 3)
        .style("opacity", 1);

    this.gridlines.exit()
      .transition()
        .duration(this.config.duration / 3)
        .style("opacity", 0)
        .remove();
  }

  this.initialDraw = function (graphData) {
    var data = yScale.ticks(graphData.maxRange);
    this.gridlines = this.gridlines.data(data);
    this.gridlines.enter().append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", this.dimensions.leftMargin)
        .attr("x2", this.dimensions.leftGraphWidth)
        .attr("y1", function(d){ return yScale(d);})
        .attr("y2", function(d){ return yScale(d);})
        .attr("stroke", "#DEDFE0")
        .attr("shape-rendering", "crispEdges")
        .attr("stroke-width", "1px")
        .style("opacity", 1);
  }
  this.initialDraw(this.graphData);
}
