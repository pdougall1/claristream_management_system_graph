describe("GraphData", function() {
  var dimensions, selector, element;

  beforeEach(function() {
    selector = "#stage";
    elementMock = {
      height: function() { return 300 },
      width: function() { return 1000 },
      selector: selector
    }
    margins = { top: 20, right: 20, bottom: 30, left: 40 };
    dimensions = new Dimensions(elementMock, margins);
  });

  it("remembers the passed in selector", function() {
    expect(dimensions.selector).toEqual(selector);
  });

  it('has margins', function() {
    expect(dimensions.topMargin).toEqual(20)
    expect(dimensions.rightMargin).toEqual(20)
    expect(dimensions.bottomMargin).toEqual(30)
    expect(dimensions.leftMargin).toEqual(40)
  });

  it('has an element', function() {
    expect(dimensions.element.selector).toEqual(selector)
  });

  it('has a height', function() {
    expect(dimensions.height).toEqual(300)
  });

  it('has a width', function() {
    expect(dimensions.width).toEqual(1000)
  });

  it('has an inner width', function() {
    expect(dimensions.innerWidth).toEqual(940)
  });

  it('has a topGraphHeight', function() {
    expect(dimensions.topGraphHeight).toEqual(270)
  });

  it('has a leftGraphWidth', function() {
    expect(dimensions.leftGraphWidth).toEqual(980)
  });
});
