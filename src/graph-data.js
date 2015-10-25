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
  this.parseData = function (data) {
    var range, ranges, y0, _this;
    _this = this;
    ranges = [];
    this.rangeNames.forEach( function(name) {
      range = { name: name };
      y0 = 0;
      range.statuses = [];
      statuses.forEach( function (status) {
        var newStatus = $.extend({}, status);
        newStatus.y0 = y0;
        newStatus.y1 = y0 += _this.originalData[name][status.name];
        range.statuses.push(newStatus);
      });
      ranges.push(range);
    });
    return ranges;
  }

  this.getMaxRange = function (data) {
    var num, max;
    max = 0;
    this.rangeNames.forEach( function (name) {
      num = sumOfValues(data[name]);
      if (num > max) { max = num }
    });
    return max;
  }

  // ATTRIBUTES
  this.originalData = data;
  this.statuses = statuses;
  this.rangeNames = Object.keys(data);
  this.rangeCount = this.rangeNames.length
  this.maxRange = this.getMaxRange(data);
  this.parsedData = this.parseData(data);
}
