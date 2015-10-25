var onLoadCallback = function () {

  // statuses provides information about the order and value of he status being shown
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

  // margins that give a little room on the edges, include the axes
  var margins      = { top: 20, right: 20, bottom: 30, left: 40 };
  var dimensions   = new Dimensions($("#stage"), margins);
  var graphOneData = new GraphData(MockData.graphOne, statuses);
  var graphTwoData = new GraphData(MockData.graphTwo, statuses);

  // create a graph data object for each of your graphs
  var graph        = new Graph(graphOneData, dimensions);

  // just providing toys to interact with in the console :)
  window.graph = graph;
  window.graphOneData = graphOneData;
  window.graphTwoData = graphTwoData;

  // This is how one might interact with the interface
  console.log("Can update between graph data!")
  setTimeout(function () { graph.updataData(graphTwoData) }, 1000);
  setTimeout(function () { graph.updataData(graphOneData) }, 2000);
  setTimeout(function () { graph.updataData(graphTwoData) }, 3000);
  setTimeout(function () {
    console.log('Can activate and inactivate statuses in the graph data!')
  }, 4000);
  setTimeout(function () { graphTwoData.makeInactive('delivered') }, 4000);
  setTimeout(function () { graphTwoData.makeInactive('forReview') }, 4500);
  setTimeout(function () { graphTwoData.makeInactive('inProgress') }, 5000);
  setTimeout(function () { graphTwoData.makeInactive('assigned') }, 5500);

  setTimeout(function () { graphTwoData.makeActive('assigned') }, 6000);
  setTimeout(function () { graphTwoData.makeActive('inProgress') }, 6500);
  setTimeout(function () { graphTwoData.makeActive('forReview') }, 7000);
  setTimeout(function () { graphTwoData.makeActive('delivered') }, 7500);
}

window.addEventListener('load', onLoadCallback, false )
