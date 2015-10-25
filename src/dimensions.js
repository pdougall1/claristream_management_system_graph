var Dimensions = function (element, margins) {
  this.margins = margins;
  this.element = element;
  this.selector = this.element.selector;
  this.height = this.element.height();
  this.width = this.element.width();

  // assign margins
  this.topMargin = this.margins.top;
  this.rightMargin = this.margins.right;
  this.bottomMargin = this.margins.bottom;
  this.leftMargin = this.margins.left;

  // assign complex margins
  this.innerWidth = this.width - this.leftMargin - this.rightMargin;
  this.topGraphHeight = this.height - this.bottomMargin;
  this.leftGraphWidth = this.width - this.rightMargin
}
