"use strict";

var _Lappy = require("./Lappy.js");

//import Lappy
//window.onload = function () {
//toggle an element's css class
function toggleClass(element, CSSClass) {
  if (element.classList.contains(CSSClass)) {
    element.classList.remove(CSSClass);
  } else {
    element.classList.add(CSSClass);
  }
}

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var $hamburger = $(".header__hamburger");
var $hamburgerInner = $(".hamburger__inner");
var $navigation = $(".navigation");
var $header = $(".header");
var $$badContrast = $$(".content__section:nth-child(even)");
var headerOverlap = new _Lappy.ActiveOverlapObject($header);
headerOverlap.addTrackedObject($$badContrast, {
  onOverlap: function onOverlap(main, check) {
    $header.classList.add('scrolled');
    $navigation.classList.add('scrolled');
  },
  onLeave: function onLeave(main, check) {
    $header.classList.remove('scrolled');
    $navigation.classList.remove('scrolled');
  }
}); //console.log(headerOverlap.trackedObjects[0].callbacks.onLeave.toString());

var L = new _Lappy.Lappy();
L.addActiveObject(headerOverlap);

$hamburger.onclick = function () {
  toggleClass($hamburger, 'is-active');
  toggleClass($navigation, 'is-open');
};

window.addEventListener('scroll', function () {
  L.watch();
});
L.watch(); //}