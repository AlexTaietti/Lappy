"use strict";

var _Lappy = require("./Lappy.js");

//import Lappy
window.onload = function () {
  ////////////
  // THINGS //
  ////////////
  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);
  var main = $('.test-container.main');
  var second = $('.test-container.second');
  var check = $('.test-container.check');
  var mainCanvas = $('#main-canvas');
  var mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = document.body.offsetWidth;
  mainCanvas.height = document.body.offsetHeight;
  mainCtx.font = "1rem sans-serif";
  var draggingMain = false;
  var draggingCheck = false; ////////////
  // EVENTS //
  ////////////

  main.addEventListener('mousedown', function () {
    draggingMain = true;
  });
  document.addEventListener('mouseup', function () {
    if (draggingMain) {
      draggingMain = false;
    }

    if (draggingCheck) {
      draggingCheck = false;
    }
  });
  window.addEventListener('mousemove', function (e) {
    if (draggingMain) {
      main.style.top = "".concat(e.clientY - main.offsetHeight / 2, "px");
      main.style.left = "".concat(e.clientX, "px");
      L.watch();
    }
  });
  window.addEventListener('resize', function () {
    L.updateGraphicalTest();
    L.watch();
  });
  document.addEventListener('scroll', function () {
    L.watch();
  }); ////////////////
  // START DEMO //
  ////////////////
  //Initialise the overlap objects

  var M = new _Lappy.ActiveOverlapObject({
    html: main,
    offset: {
      x: 30,
      y: 50
    },
    //IMPORTANT: changing an element's css inline through JS is not really great, I used this just for the sake of this demo, I would recommend manipulating the object's CSS class intead
    onApproach: function onApproach(main) {
      main.style.backgroundColor = "red";
    },
    onLeave: function onLeave(main) {
      main.style.backgroundColor = "#d9514e";
    },
    onExit: function onExit(main, check) {
      check.style = null;
    },
    onOverlap: function onOverlap(main, check) {
      main.style.backgroundColor = "blue";
      check.style.backgroundColor = "red";
    }
  });
  var C = new _Lappy.BasicOverlapObject({
    html: check,
    offset: {
      x: 20,
      y: 40
    }
  });
  var S = new _Lappy.BasicOverlapObject({
    html: second,
    offset: {
      x: 30,
      y: 20
    }
  });
  M.addTrackedObject(C);
  M.addTrackedObject(S); //initialise Lappy

  var L = new _Lappy.Lappy({
    graphicalTest: {
      context: mainCtx
    }
  }); //add the overlap object to be watched (could be more than one) to lappy

  L.addActiveObject(M); //kick the demo off

  L.watch();
};