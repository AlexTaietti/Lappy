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

    this.context = options.context || undefined;
    this.approachColor = options.approachStroke || 'red';
    this.approachFill = options.approachFill || 'red';
    this.paused = false;
  }

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
    }
  }, {
    key: "drawApproachArea",
    value: function drawApproachArea(target) {
      this.context.beginPath();
      this.context.strokeStyle = this.approachColor;
      this.context.setLineDash([5, 10]);
      this.context.strokeRect(target.coordinates[0].x, target.coordinates[0].y, target.coordinates[2].x - target.coordinates[0].x, target.coordinates[2].y - target.coordinates[0].y);
      this.context.moveTo(0, target.offset);
      this.context.lineTo(window.innerWidth, target.offset);
      this.context.stroke();
      this.context.closePath();
    }
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
    }
  }, {
    key: "clearTestDisplay",
    value: function clearTestDisplay() {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.clearTestDisplay();
      this.paused = true;
    }
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
  function BasicOverlapObject() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BasicOverlapObject);

    var defaults = {
      html: undefined,
      offset: {
        x: 0,
        y: 0
      },
      axis: {
        x: true,
        y: true
      }
    };
    var completeOptions = options ? mergeObjects(defaults, options) : defaults; //html

    this.HTML = completeOptions.html;
    this.htmlClass = completeOptions.html.classList; //object data

    this.offset = !isNaN(completeOptions.offset) && completeOptions.offset > 0 ? {
      x: 0,
      y: completeOptions.offset
    } : completeOptions.offset;
    this.axis = completeOptions.axis;
    this.active = false;
    this.htmlCoordinates = getInnerCoords(completeOptions.html);
    this.coordinates = getOuterCoords(completeOptions.html, completeOptions.offset);
  }

  _createClass(BasicOverlapObject, [{
    key: "updateCoordinates",
    value: function updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset);
    }
  }]);

  return BasicOverlapObject;
}();

exports.BasicOverlapObject = BasicOverlapObject;

var ActiveOverlapObject = /*#__PURE__*/function (_BasicOverlapObject) {
  _inherits(ActiveOverlapObject, _BasicOverlapObject);

  var _super = _createSuper(ActiveOverlapObject);

  function ActiveOverlapObject() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ActiveOverlapObject);

    _this = _super.call(this, options); //this boi is active

    _this.active = true; //passive objects this boiii can interact with

    _this.trackedObjects = [];
    return _this;
  }

  _createClass(ActiveOverlapObject, [{
    key: "updateCoordinates",
    value: function updateCoordinates() {
      this.htmlCoordinates = getInnerCoords(this.HTML);
      this.coordinates = getOuterCoords(this.HTML, this.offset);

      for (var i = 0; i < this.trackedObjects.length; i++) {
        this.trackedObjects[i].object.updateCoordinates();
      }
    }
  }, {
    key: "addTrackedObject",
    value: function addTrackedObject(overlapObject) {
      var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      //default callbacks
      var defaults = {
        onApproach: function onApproach(main, check) {
          console.log("I <".concat(main.classList, "> am approaching something!"));
        },
        onOverlap: function onOverlap(main, check) {
          console.log("I <".concat(main.classList, "> am overlapping something!"));
        },
        onExit: function onExit(main, check) {
          console.log("I <".concat(main.classList, "> am exiting something!"));
        },
        onLeave: function onLeave(main, check) {
          console.log("I <".concat(main.classList, "> am leaving something!"));
        }
      };
      this.trackedObjects.push({
        object: overlapObject,
        callbacks: callbacks || defaults,
        lastOverlapData: {
          x: undefined,
          y: undefined
        }
      });
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
  }

  _createClass(Lappy, [{
    key: "addActiveObject",
    value: function addActiveObject(newOverlapObject) {
      this.overlapObjects.push(newOverlapObject);
    }
  }, {
    key: "updateGraphicalTest",
    value: function updateGraphicalTest() {
      this.graphicalTest.context.canvas.width = document.body.offsetWidth;
      this.graphicalTest.context.canvas.height = document.body.offsetHeight;
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
    }
  }, {
    key: "updateCoordinates",
    value: function updateCoordinates() {
      for (var i = 0; i < this.overlapObjects.length; i++) {
        this.overlapObjects[i].updateCoordinates();
      }
    }
  }, {
    key: "calculateOverlap",
    value: function calculateOverlap(main, check) {
      var overlapX = this.checkOverlapX(main, check);
      var overlapY = this.checkOverlapY(main, check);
      return {
        x: main.axis.x ? overlapX : overlapY,
        y: main.axis.y ? overlapY : overlapX
      };
    } //if neither of the two objects involved in the overlap have an offset property the only two callbacks executed will be "onOverlap" and "onLeave" ("definitely something I'll fix soon!")

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
      this.graphicalTest.clearTestDisplay();

      for (var i = 0; i < this.overlapObjects.length; i++) {
        this.graphicalTest.display(this.overlapObjects[i]);
      }
    }
  }, {
    key: "addGraphicalTest",
    value: function addGraphicalTest(graphicalTestData) {
      if (!this.graphicalTest) {
        this.graphicalTest = new GraphicalTest(graphicalTestData);
      } else {
        throw 'Graphical test already initialised!';
      }
    }
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
}

function getOuterCoords(element) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var coords = [],
      w = element.offsetWidth,
      h = element.offsetHeight;
  coords[0] = {
    y: element.getBoundingClientRect().y + window.scrollY - offset.y,
    x: element.getBoundingClientRect().x + window.scrollX - offset.x
  };
  coords[1] = {
    y: element.getBoundingClientRect().y + window.scrollY - offset.y,
    x: element.getBoundingClientRect().x + window.scrollX + w + offset.x
  };
  coords[2] = {
    y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
    x: element.getBoundingClientRect().x + window.scrollX + w + offset.x
  };
  coords[3] = {
    y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
    x: element.getBoundingClientRect().x + window.scrollX - offset.x
  };
  return coords;
}

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
}