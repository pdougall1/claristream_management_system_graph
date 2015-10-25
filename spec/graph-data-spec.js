describe("GraphData", function() {
  var graphData, data;

  beforeEach(function() {
    data = MockData.graphOne;
    graphData = new GraphData(data);
  });

  it("remembers the original data", function() {
    expect(graphData.originalData).toEqual(data);
  });

  it('knows the names of ranges', function() {
    expect(graphData.rangeNames).toEqual(['0-2', '3-5', '6-8', '9-11', '12-14', '15-17', '18-20', '21+'])
  });

  it('knows the maxRange', function() {
    expect(graphData.maxRange).toEqual(7)
  });

  it('has a range count', function() {
    expect(graphData.rangeCount).toEqual(8)
  });

  it('has parsed data', function() {
    expect(JSON.stringify(graphData.parsedData)).toEqual(graphOneFormattedJson);
  });
});
