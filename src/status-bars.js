var StatusBars = function (stage, graphData, dimensions, yScale, xScale) {
  this.stage = stage;
  this.graphData = graphData;
  this.dimensions = dimensions;
  this.yScale = yScale;
  this.xScale = xScale;

  this.ranges = this.stage.selectAll(".range")
    .data(this.graphData.parsedData)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d, i) { return "translate(" + xScale(i) + ",0)"; });

  this.statusBars = this.ranges.selectAll("rect")
    .data(function (d) { return d.statuses })
    .enter().append("rect")
    .attr("width", xScale.rangeBand())
    .attr("x", this.dimensions.leftMargin)
    .attr("y", function(d) { return yScale(d.y1) })
    .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) })
    .style("fill", function(d) { return d.hex });

}
