// ____________________________________________________
// just some helpers because js is bad at using objects like a dictionary
var getValues = function (obj) {
  var values = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      values.push(obj[key]);
    }
  }
  return values;
};

var sumOfValues = function (obj) {
  return d3.sum(getValues(obj));
}
// ____________________________________________________


// data format     { columnOne: { stackOne: value, stackTwo: value } }
// statuses format [{ name: 'greatName', hex: "#hexcolor" }]
var GraphData = function (data, statuses) {
  // this could definitely use some attention
  // perhaps we need a range object?
  this.addParsedData = function () {
    var range, ranges, y0, data;
    data = this.data;
    ranges = [];
    this.rangeNames.forEach( function(name) {
      range = { name: name };
      y0 = 0;
      range.statuses = [];
      statuses.forEach( function (status) {
        if (!status.inactive) {
          var newStatus = $.extend({}, status);
          newStatus.y0 = y0;
          newStatus.y1 = y0 += data[name][status.name];
          range.statuses.push(newStatus);
        }
      });
      ranges.push(range);
    });
    this.parsedData = ranges;
  }

  this.dataUpdatedCallback = function () {
    console.log('set a dataUpdatedCallback')
  }

  this.setDataUpdatedCallback = function (callback) {
    this.dataUpdatedCallback = callback;
  }

  this.addMaxRange = function () {
    var num, max, data;
    data = this.parsedData;
    max = 0;
    data.forEach( function (range) {
      if (range.statuses.length > 0) {
        num = range.statuses[range.statuses.length - 1].y1
        if (num > max) { max = num }
      }
    });
    this.maxRange = max;
  }

  this.makeActive = function (statusName) {
    this.statuses.forEach( function (status) {
      if (status.name == statusName) {
        status.inactive = false;
      }
    });
    this.buildData();
  }

  this.makeInactive = function (statusName) {
    this.statuses.forEach( function (status) {
      if (status.name == statusName) {
        status.inactive = true;
      }
    });
    this.buildData();
  }

  this.buildData = function () {
    this.addParsedData();// ___ order dependancy
    this.addMaxRange();  // _/
    this.dataUpdatedCallback(this);
  }

  // ATTRIBUTES
  this.data = data;
  this.statuses = statuses;
  this.rangeNames = Object.keys(data);
  this.rangeCount = this.rangeNames.length
  this.buildData()
}
