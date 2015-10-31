var HorizontalGridlines = function (stage, graphData, dimensions, yScale) {
  this.stage = stage;
  this.graphData = graphData;
  this.dimensions = dimensions;
  this.yScale = yScale;
  this.selector = "line.horizontalGrid";
  this.gridlinesGroup = this.stage.append('g')
  this.gridlines = this.gridlinesGroup.selectAll(this.selector);

  this.update = function (newData) {
    var yScale = this.yScale.domain([0, newData.maxRange]);
    var data = yScale.ticks(newData.maxRange)
    this.gridlines = this.gridlines.data(data);

    this.gridlines.attr("class", "horizontalGrid")
      .transition()
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
        .style("fill-opacity", 0)
      .transition()
        .style("fill-opacity", 1);

    this.gridlines.exit()
      .transition()
        .style("opacity", 0)
        .remove();
  }

  this.update(this.graphData);
}
