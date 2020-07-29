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
  var check = $('.test-container.check'); // Toggle graphical test

  var graphicalTestToggle = $('#graphicalTestToggle');
  graphicalTestToggle.addEventListener('click', function () {
    if (!L.graphicalTest.paused) {
      L.graphicalTest.pause();
    } else {
      L.graphicalTest.resume();
      L.displayGraphicalTest();
    }
  }); //canvas set up

  var mainCanvas = $('#main-canvas');
  var mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = document.body.offsetWidth;
  mainCanvas.height = document.body.offsetHeight;
  mainCtx.font = "1rem sans-serif"; //dragging flags

  var draggingMain = false;
  var draggingCheck = false; ////////////
  // EVENTS //
  ////////////

  main.addEventListener('mousedown', function () {
    draggingMain = true;
  });
  main.addEventListener('touchstart', function () {
    draggingMain = true;
  });
  document.addEventListener('mouseup', function () {
    if (draggingMain) {
      draggingMain = false;
    }
  });
  document.addEventListener('touchend', function () {
    if (draggingMain) {
      draggingMain = false;
    }
  });
  document.addEventListener('mousemove', function (e) {
    if (draggingMain) {
      main.style.top = window.innerWidth >= 650 ? "".concat(e.clientY - main.offsetHeight / 2, "px") : "".concat(e.clientY, "px");
      main.style.left = "".concat(e.clientX, "px");
      L.watch();
    }
  });
  document.addEventListener('touchmove', function (e) {
    if (draggingMain) {
      main.style.top = "".concat(e.touches[0].clientY, "px");
      main.style.left = "".concat(e.touches[0].clientX, "px");
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
    offset: window.innerWidth >= 768 ? {
      x: 30,
      y: 50
    } : {
      x: 15,
      y: 25
    },
    //IMPORTANT: changing an element's css inline through JS is not really great thats's why recommend manipulating the object's CSS class instead
    onApproach: function onApproach(main, check) {
      main.classList.add('approaching');
      check.classList.add('approaching');
    },
    onLeave: function onLeave(main, check) {
      main.classList.remove('approaching');
      check.classList.remove('approaching');
    },
    onExit: function onExit(main, check) {
      main.classList.remove('overlapping');
      check.classList.remove('overlapping');
    },
    onOverlap: function onOverlap(main, check) {
      main.classList.remove('approaching');
      check.classList.remove('approaching');
      main.classList.add('overlapping');
      check.classList.add('overlapping');
    }
  });
  var C = new _Lappy.BasicOverlapObject({
    html: check,
    offset: window.innerWidth >= 768 ? {
      x: 20,
      y: 40
    } : {
      x: 10,
      y: 20
    }
  });
  var S = new _Lappy.BasicOverlapObject({
    html: second,
    offset: window.innerWidth >= 768 ? {
      x: 30,
      y: 20
    } : {
      x: 15,
      y: 10
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