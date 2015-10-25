var onLoadCallback = function () {
  var graphOne = MockData.graphOne;
  var statuses = [
    {
      name: 'assigned',
      hex:  '#DDE1E4'
    }, {
      name: 'inProgress',
      hex:  '#EDA72A'
    }, {
      name: 'forReview',
      hex:  '#33ACE0'
    }, {
      name: 'delivered',
      hex:  '#CCE7AE'
    }
  ]

  // I suggest just binding to the height and width of the containting element
  // this makes it easier to manage things with CSS
  var id         = "#stage";
  var element    = $(id)
  var margins    = {top: 20, right: 20, bottom: 30, left: 40}
  var dimensions = new Dimensions(element, margins)
  var graphData  = new GraphData(graphOne, statuses);
  var graph      = new Graph(graphData, dimensions);

}

window.addEventListener('load', onLoadCallback, false )
