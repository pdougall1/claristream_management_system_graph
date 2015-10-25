var onLoadCallback = function () {
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

  var id           = "#stage";
  var element      = $(id)
  var margins      = {top: 20, right: 20, bottom: 30, left: 40}
  var dimensions   = new Dimensions(element, margins)
  var graphOneData = new GraphData(MockData.graphOne, statuses);
  var graphTwoData = new GraphData(MockData.graphTwo, statuses);
  var graph        = new Graph(graphOneData, dimensions);

  window.graph = graph;
  window.one = graphOneData;
  window.two = graphTwoData;
}

window.addEventListener('load', onLoadCallback, false )
