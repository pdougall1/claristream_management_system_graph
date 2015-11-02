var StatusBars = function (stage, graphData, dimensions, yScale, xScale, config) {
  this.stage = stage;
  this.graphData = graphData;
  this.dimensions = dimensions;
  this.config = config;
  this.yScale = yScale;
  this.xScale = xScale;
  this.rangeGroup = this.stage.append('g')
    .attr("class", "rangeGroup");

  this.ranges = this.rangeGroup.selectAll(".range")
    .data(this.graphData.parsedData)
    .enter().append("g")
    .attr("class", "range")
    .attr("transform", function(d, i) { return "translate(" + xScale(i) + ",0)"; });

  this.initialDraw = function (data) {
    var yScale = this.yScale;

    this.statusBars = this.ranges.selectAll("rect")
      .data(function (d, i) { return data.parsedData[i].statuses });

    this.statusBars.enter().append("svg:a")
        .attr("xlink:href", function(d){return d.link;})
      .append("rect")
        .attr("width", xScale.rangeBand())
        .attr("x", this.dimensions.leftMargin)
        .attr("y", function(d) { return yScale(d.y1) })
        .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) })
        .style("fill", function(d) { return d.hex });
  }

  this.update = function (newData) {
    var yScale = this.yScale.domain([0, newData.maxRange]);

    this.statusBars = this.ranges.selectAll("rect")
      .data(function (d, i) { return newData.parsedData[i].statuses });

    this.statusBars.transition()
      .duration(this.config.duration)
      .style("fill", function(d) { return d.hex })
      .attr("y", function(d) { return yScale(d.y1) })
      .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) });

    this.statusBars.enter().append("rect")
      .attr("width", xScale.rangeBand())
      .attr("x", this.dimensions.leftMargin)
      .attr("y", function(d) { return yScale(d.y0) })
      .attr("height", 0)
      .style("fill", function(d) { return d.hex })
      .transition()
        .duration(this.config.duration)
        .attr("y", function(d) { return yScale(d.y1) })
        .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1) });

    this.statusBars.exit()
      .transition()
        .duration(this.config.duration)
        .attr("height", 0)
        .attr("y", function(d) { return yScale(d.y0) })
        .remove();
  }

  this.initialDraw(this.graphData);
}
