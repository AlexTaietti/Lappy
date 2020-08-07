"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lappy = exports.ActiveOverlapObject = exports.BasicOverlapObject = exports.GraphicalTest = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GraphicalTest = /*#__PURE__*/function () {
  function GraphicalTest() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GraphicalTest);

    var defaults = {
      context: undefined,
      approachColor: 'red'
    };
    var completeOptions = mergeObjects(defaults, options); // context options (more coming soon!)

    this.context = completeOptions.context;
    this.approachColor = completeOptions.approachColor; // paused flag

    this.paused = false;
  } // display the coordinates of each vertex of the target (aka the current element) relative to the document's top left corner
  // basically the space used to represent the elements is the inverse first quadrant of a 2D plane


  _createClass(GraphicalTest, [{
    key: "displayCoordinates",
    value: function displayCoordinates(target) {
      this.context.beginPath();
      this.context.fillStyle = "black";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText("x:".concat(~~target.htmlCoordinates[0].x, ", y:").concat(~~target.htmlCoordinates[0].y), ~~target.htmlCoordinates[0].x, ~~target.htmlCoordinates[0].y - 15);
      this.context.fillText("x:".concat(~~target.htmlCoordinates[1].x, ", y:").concat(~~target.htmlCoordinates[1].y), ~~target.htmlCoordinates[1].x, ~~target.htmlCoordinates[1].y - 15);
      this.context.fillText("x:".concat(~~target.htmlCoordinates[2].x, ", y:").concat(~~target.htmlCoordinates[2].y), ~~target.htmlCoordinates[2].x, ~~target.htmlCoordinates[2].y + 15);
      this.context.fillText("x:".concat(~~target.htmlCoordinates[3].x, ", y:").concat(~~target.htmlCoordinates[3].y), ~~target.htmlCoordinates[3].x, ~~target.htmlCoordinates[3].y + 15);
      this.context.closePath();
    } // draw a dashed line on the outer area of the object

  }, {
    key: "drawApproachArea",
    value: function drawApproachArea(target) {
      this.context.beginPath();
      this.context.strokeStyle = this.approachColor;
      this.context.setLineDash([5, 10]);
      this.context.strokeRect(target.coordinates[0].x, target.coordinates[0].y, target.coordinates[2].x - target.coordinates[0].x, target.coordinates[2].y - target.coordinates[0].y);
      this.context.stroke();
      this.context.closePath();
    } // display the target on the graphical test canvas

  }, {
    key: "display",
    value: function display(target) {
      this.displayCoordinates(target);
      if (target.offset.x || target.offset.y) this.drawApproachArea(target);

      if (target.active && target.trackedObjects.length) {
        for (var i = 0; i < target.trackedObjects.length; i++) {
          this.display(target.trackedObjects[i].object);
        }
      }
    } // clear the graphical test's display

  }, {
    key: "clearTestDisplay",
    value: function clearTestDisplay() {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    } // pause graphical test

  }, {
    key: "pause",
    value: function pause() {
      this.clearTestDisplay();
      this.paused = true;
    } // resume graphical test

  }, {
    key: "resume",
    value: function resume() {
      this.paused = false;
    }
  }]);

  return GraphicalTest;
}();

exports.GraphicalTest = GraphicalTest;

var BasicOverlapObject = /*#__PURE__*/function () {
  function BasicOverlapObject(htmlElement) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BasicOverlapObject);

    var defaults = {
      offset: {
        x: 0,
        y: 0
      },
      axis: {
        x: true,
        y: true
      }
    };
    var completeOptions = mergeObjects(defaults, options); // object's HTML

    this.HTML = htmlElement; // object data

    this.offset = completeOptions.offset;
    this.axis = completeOptions.axis;
    this.active = false;
    this.htmlCoordinates = getInnerCoords(htmlElement);
    this.coordinates = getOuterCoords(htmlElement, completeOptions.offset, completeOptions.axis);
  } // update both the coordinates of the actual HTML element as well as the imaginary offset bounding box surrounding it


  _createClass(BasicOverlapObject, [{
    key: "updateCoordinates",
    value: function updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset, this.axis);
    }
  }]);

  return BasicOverlapObject;
}();

exports.BasicOverlapObject = BasicOverlapObject;

var ActiveOverlapObject = /*#__PURE__*/function (_BasicOverlapObject) {
  _inherits(ActiveOverlapObject, _BasicOverlapObject);

  var _super = _createSuper(ActiveOverlapObject);

  function ActiveOverlapObject(htmlElement) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ActiveOverlapObject);

    // invoke super class constructor (aka BasicOverlapObject's constructor)
    _this = _super.call(this, htmlElement, options); // this boi is active

    _this.active = true; // passive objects this boiii can interact with

    _this.trackedObjects = [];
    return _this;
  } // update the active element's coordinates as well as the coordinates of the basic objects it may interact with


  _createClass(ActiveOverlapObject, [{
    key: "updateCoordinates",
    value: function updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset, this.axis);

      for (var i = 0; i < this.trackedObjects.length; i++) {
        this.trackedObjects[i].object.updateCoordinates();
      }
    } // add a new basic object this active one can interact with (can also be an HTML collection)

  }, {
    key: "addTrackedObject",
    value: function addTrackedObject(overlapObject) {
      var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // default callbacks
      var defaultCallbacks = {
        onApproach: function onApproach(main, check) {
          return 1;
        },
        onOverlap: function onOverlap(main, check) {
          return 1;
        },
        onExit: function onExit(main, check) {
          return 1;
        },
        onLeave: function onLeave(main, check) {
          return 1;
        }
      };

      if (overlapObject.length) {
        for (var i = 0; i < overlapObject.length; i++) {
          this.trackedObjects.push({
            object: overlapObject instanceof BasicOverlapObject ? overlapObject : new BasicOverlapObject(overlapObject[i], options),
            callbacks: mergeObjects(defaultCallbacks, callbacks),
            lastOverlapData: {
              x: undefined,
              y: undefined
            }
          });
        }
      } else {
        this.trackedObjects.push({
          object: overlapObject instanceof BasicOverlapObject ? overlapObject : new BasicOverlapObject(overlapObject, options),
          callbacks: mergeObjects(defaultCallbacks, callbacks),
          lastOverlapData: {
            x: undefined,
            y: undefined
          }
        });
      }
    }
  }]);

  return ActiveOverlapObject;
}(BasicOverlapObject);

exports.ActiveOverlapObject = ActiveOverlapObject;

var Lappy = /*#__PURE__*/function () {
  function Lappy() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Lappy);

    if (options.graphicalTest) this.graphicalTest = new GraphicalTest(options.graphicalTest);
    this.overlapObjects = [];
  } // add one more active object to be tracked by Lappy


  _createClass(Lappy, [{
    key: "addActiveObject",
    value: function addActiveObject(newOverlapObject) {
      this.overlapObjects.push(newOverlapObject);
    } // resize the graphical test canvas' dimensions (to be called whenever the window is resized)

  }, {
    key: "resizeGraphicalTestCanvas",
    value: function resizeGraphicalTestCanvas() {
      this.graphicalTest.context.canvas.width = getDocumentWidth();
      this.graphicalTest.context.canvas.height = getDocumentHeight();
    }
  }, {
    key: "checkOverlapY",
    value: function checkOverlapY(main, check) {
      if (main.htmlCoordinates[2].y - check.htmlCoordinates[0].y >= 0 && main.htmlCoordinates[2].y - check.htmlCoordinates[2].y <= 0) {
        return 1;
      }

      if (main.htmlCoordinates[0].y - check.htmlCoordinates[2].y <= 0 && main.htmlCoordinates[0].y - check.htmlCoordinates[0].y >= 0) {
        return -1;
      }

      if (main.coordinates[2].y - check.coordinates[0].y >= 0 && main.coordinates[2].y - check.coordinates[2].y <= 0) {
        return 2;
      }

      if (main.coordinates[0].y - check.coordinates[2].y <= 0 && main.coordinates[0].y - check.coordinates[0].y >= 0) {
        return -2;
      }

      return 0;
    }
  }, {
    key: "checkOverlapX",
    value: function checkOverlapX(main, check) {
      if (main.htmlCoordinates[2].x - check.htmlCoordinates[0].x >= 0 && main.htmlCoordinates[2].x - check.htmlCoordinates[2].x <= 0) {
        return 1;
      }

      if (main.htmlCoordinates[0].x - check.htmlCoordinates[2].x <= 0 && main.htmlCoordinates[0].x - check.htmlCoordinates[0].x >= 0) {
        return -1;
      }

      if (main.coordinates[2].x - check.coordinates[0].x >= 0 && main.coordinates[2].x - check.coordinates[2].x <= 0) {
        return 2;
      }

      if (main.coordinates[0].x - check.coordinates[2].x <= 0 && main.coordinates[0].x - check.coordinates[0].x >= 0) {
        return -2;
      }

      return 0;
    } // update every active object's coordinates (which will in turn update every one of its basic objects' coordinates)

  }, {
    key: "updateCoordinates",
    value: function updateCoordinates() {
      for (var i = 0; i < this.overlapObjects.length; i++) {
        this.overlapObjects[i].updateCoordinates();
      }
    } // detect any overlap between a target object (active) and a check (basic)

  }, {
    key: "calculateOverlap",
    value: function calculateOverlap(main, check) {
      var overlapX = this.checkOverlapX(main, check);
      var overlapY = this.checkOverlapY(main, check);
      return {
        x: main.axis.x ? overlapX : overlapY,
        y: main.axis.y ? overlapY : overlapX
      };
    } // for now if neither of the two objects involved in the overlap have an offset property the only two callbacks executed will be "onOverlap" and "onLeave" ("definitely something I'll fix soon!")

  }, {
    key: "checkOverlap",
    value: function checkOverlap(main, check) {
      var overlap = this.calculateOverlap(main, check.object);

      if (overlap.x && overlap.y) {
        if (Math.abs(overlap.x) === Math.abs(overlap.y)) {
          if (overlap.x % 2 === 0 && overlap.y % 2 === 0) {
            if ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0 || (overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) {
              check.callbacks.onExit(main.HTML, check.object.HTML);
            } else {
              check.callbacks.onApproach(main.HTML, check.object.HTML);
            }
          } else {
            check.callbacks.onOverlap(main.HTML, check.object.HTML);
          }
        } else if (overlap.x % 2 === 0 || overlap.y % 2 === 0) {
          if ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0 || (overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) {
            check.callbacks.onExit(main.HTML, check.object.HTML);
          } else {
            check.callbacks.onApproach(main.HTML, check.object.HTML);
          }
        }
      } else if ((!overlap.x || !overlap.y) && check.lastOverlapData.x && check.lastOverlapData.y) {
        check.callbacks.onLeave(main.HTML, check.object.HTML);
      }

      check.lastOverlapData = overlap;
    }
  }, {
    key: "displayGraphicalTest",
    value: function displayGraphicalTest() {
      this.updateCoordinates();
      this.graphicalTest.clearTestDisplay();

      for (var i = 0; i < this.overlapObjects.length; i++) {
        this.graphicalTest.display(this.overlapObjects[i]);
      }
    } // initialise a graphical test for Lappy's current instance

  }, {
    key: "addGraphicalTest",
    value: function addGraphicalTest(graphicalTestData) {
      if (!this.graphicalTest) {
        this.graphicalTest = new GraphicalTest(graphicalTestData);
        this.resizeGraphicalTestCanvas();
      } else {
        throw 'Graphical test already initialised!';
      }
    } // This is how the Lappy dooo...

  }, {
    key: "watch",
    value: function watch() {
      this.updateCoordinates();

      if (this.graphicalTest && !this.graphicalTest.paused) {
        this.displayGraphicalTest();
      }

      for (var i = 0; i < this.overlapObjects.length; i++) {
        var currentActive = this.overlapObjects[i];

        for (var r = 0; r < currentActive.trackedObjects.length; r++) {
          this.checkOverlap(currentActive, currentActive.trackedObjects[r]);
        }
      }
    }
  }]);

  return Lappy;
}(); ///////////////////////////
// FUNCTIONS & VARIABLES //
///////////////////////////
// get an HTML element's variables


exports.Lappy = Lappy;

function getInnerCoords(element) {
  var coords = [],
      w = element.offsetWidth,
      h = element.offsetHeight;
  coords[0] = {
    y: element.getBoundingClientRect().y + window.scrollY,
    x: element.getBoundingClientRect().x + window.scrollX
  };
  coords[1] = {
    y: element.getBoundingClientRect().y + window.scrollY,
    x: element.getBoundingClientRect().x + window.scrollX + w
  };
  coords[2] = {
    y: element.getBoundingClientRect().y + window.scrollY + h,
    x: element.getBoundingClientRect().x + window.scrollX + w
  };
  coords[3] = {
    y: element.getBoundingClientRect().y + window.scrollY + h,
    x: element.getBoundingClientRect().x + window.scrollX
  };
  return coords;
} // get an overlapObject's outer apprach area's coordinates


function getOuterCoords(element) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    x: undefined,
    y: undefined
  };
  var coords = [],
      w = element.offsetWidth,
      h = element.offsetHeight;
  coords[0] = {
    y: axis.y ? element.getBoundingClientRect().y + window.scrollY - offset.y : 0,
    x: axis.x ? element.getBoundingClientRect().x + window.scrollX - offset.x : 0
  };
  coords[1] = {
    y: axis.y ? element.getBoundingClientRect().y + window.scrollY - offset.y : 0,
    x: axis.x ? element.getBoundingClientRect().x + window.scrollX + w + offset.x : window.innerWidth
  };
  coords[2] = {
    y: axis.y ? element.getBoundingClientRect().y + window.scrollY + h + offset.y : window.innerHeight,
    x: axis.x ? element.getBoundingClientRect().x + window.scrollX + w + offset.x : window.innerWidth
  };
  coords[3] = {
    y: axis.y ? element.getBoundingClientRect().y + window.scrollY + h + offset.y : window.innerHeight,
    x: axis.x ? element.getBoundingClientRect().x + window.scrollX - offset.x : 0
  };
  return coords;
} // merge two objects by replacing each of the target's properties with the corresponding object's property if defined otherwise keep the target as is


function mergeObjects(target, object, deep) {
  for (var prop in target) {
    if (object.hasOwnProperty(prop)) {
      if (_typeof(object[prop]) === "object") {
        if (deep) {
          mergeObjects(target[prop], object[prop], true);
        } else {
          target[prop] = object[prop];
        }
      } else {
        target[prop] = object[prop];
      }
    }
  }

  return target;
} // get the document's height cross browser reliably


function getDocumentHeight() {
  return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
} // get the document's width cross browser reliably


function getDocumentWidth() {
  return Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth);
}