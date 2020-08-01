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
  var testToggle = $('#graphicalTestToggle');
  var check = $('.test-container.check'); // canvas set up

  var mainCanvas = $('#main-canvas');
  var mainCtx = mainCanvas.getContext('2d');
  mainCanvas.width = document.body.offsetWidth;
  mainCanvas.height = document.body.offsetHeight;
  mainCtx.font = '1rem sans-serif'; // dragging flag

  var draggingMain = false; ////////////
  // EVENTS //
  ////////////

  testToggle.addEventListener('click', function () {
    if (!L.graphicalTest) {
      L.addGraphicalTest({
        context: mainCtx
      });
      L.displayGraphicalTest();
    } else {
      if (!L.graphicalTest.paused) {
        L.graphicalTest.pause();
      } else {
        L.graphicalTest.resume();
        L.displayGraphicalTest();
      }
    }
  });
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
    if (L.graphicalTest) {
      L.resizeGraphicalTestCanvas();
      L.displayGraphicalTest();
      L.watch();
    }
  });
  document.addEventListener('scroll', function () {
    L.watch();
  }); ////////////////
  // START DEMO //
  ////////////////
  // initialise the overlap objects

  var M = new _Lappy.ActiveOverlapObject({
    html: main,
    axis: {
      x: false,
      y: false
    },
    offset: window.innerWidth >= 768 ? {
      x: 30,
      y: 50
    } : {
      x: 15,
      y: 25
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
  }); // here are the callbacks for the left most basic object

  var checkCallbacks = {
    onApproach: function onApproach(current, target) {
      current.classList.add('approaching--check');
      target.classList.add('approached');
    },
    onLeave: function onLeave(current, target) {
      current.classList.remove('approaching--check');
      target.classList.remove('approached');
    },
    onExit: function onExit(current, target) {
      current.classList.remove('overlapping--check');
      target.classList.remove('overlapped');
      current.classList.add('approaching--check');
      target.classList.add('approached');
    },
    onOverlap: function onOverlap(current, target) {
      current.classList.remove('approaching--check');
      target.classList.remove('approached');
      current.classList.add('overlapping--check');
      target.classList.add('overlapped');
    }
  }; // and here are the ones for the right most basic object instead

  var secondCallbacks = {
    onApproach: function onApproach(current, target) {
      current.classList.add('approaching--second');
      target.classList.add('approached');
    },
    onLeave: function onLeave(current, target) {
      current.classList.remove('approaching--second');
      target.classList.remove('approached');
    },
    onExit: function onExit(current, target) {
      current.classList.remove('overlapping--second');
      target.classList.remove('overlapped');
      current.classList.add('approaching--second');
      target.classList.add('approached');
    },
    onOverlap: function onOverlap(current, target) {
      current.classList.remove('approaching--second');
      target.classList.remove('approached');
      current.classList.add('overlapping--second');
      target.classList.add('overlapped');
    }
  }; // add the basic objects C & S to M (aka the active object) in order to track their interactions

  M.addTrackedObject(C, checkCallbacks);
  M.addTrackedObject(S, secondCallbacks); // initialise Lappy

  var L = new _Lappy.Lappy(); // add the overlap object to be watched (could be more than one) to lappy

  L.addActiveObject(M); // kick off the demo!

  L.watch();
};