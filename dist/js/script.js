!function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=o(1);window.onload=function(){var t=document.querySelector.bind(document),e=(document.querySelectorAll.bind(document),t(".test-container.main")),o=t(".test-container.second"),a=t("#graphicalTestToggle"),i=t(".test-container.check"),c=t("#main-canvas"),r=c.getContext("2d");c.width=document.body.offsetWidth,c.height=document.body.offsetHeight,r.font="1rem sans-serif";var s=!1;a.addEventListener("click",(function(){u.graphicalTest?u.graphicalTest.paused?(u.graphicalTest.resume(),u.displayGraphicalTest()):u.graphicalTest.pause():(u.addGraphicalTest({context:r}),u.displayGraphicalTest())})),e.addEventListener("mousedown",(function(){s=!0})),e.addEventListener("touchstart",(function(){s=!0})),document.addEventListener("mouseup",(function(){s&&(s=!1)})),document.addEventListener("touchend",(function(){s&&(s=!1)})),document.addEventListener("mousemove",(function(t){s&&(e.style.top=window.innerWidth>=650?"".concat(t.clientY-e.offsetHeight/2,"px"):"".concat(t.clientY,"px"),e.style.left="".concat(t.clientX,"px"),u.watch())})),document.addEventListener("touchmove",(function(t){s&&(e.style.top="".concat(t.touches[0].clientY,"px"),e.style.left="".concat(t.touches[0].clientX,"px"),u.watch())})),window.addEventListener("resize",(function(){u.graphicalTest&&(u.resizeGraphicalTestCanvas(),u.displayGraphicalTest(),u.watch())})),document.addEventListener("scroll",(function(){u.watch()}));var l=new n.ActiveOverlapObject({html:e,axis:{x:!0,y:!0},offset:window.innerWidth>=768?{x:30,y:50}:{x:15,y:25}}),d=new n.BasicOverlapObject({html:i,offset:window.innerWidth>=768?{x:20,y:40}:{x:10,y:20}}),h=new n.BasicOverlapObject({html:o,offset:window.innerWidth>=768?{x:30,y:20}:{x:15,y:10}});l.addTrackedObject(d,{onApproach:function(t,e){t.classList.add("approaching--check"),e.classList.add("approached")},onLeave:function(t,e){t.classList.remove("approaching--check"),e.classList.remove("approached")},onExit:function(t,e){t.classList.remove("overlapping--check"),e.classList.remove("overlapped"),t.classList.add("approaching--check"),e.classList.add("approached")},onOverlap:function(t,e){t.classList.remove("approaching--check"),e.classList.remove("approached"),t.classList.add("overlapping--check"),e.classList.add("overlapped")}}),l.addTrackedObject(h,{onApproach:function(t,e){t.classList.add("approaching--second"),e.classList.add("approached")},onLeave:function(t,e){t.classList.remove("approaching--second"),e.classList.remove("approached")},onExit:function(t,e){t.classList.remove("overlapping--second"),e.classList.remove("overlapped"),t.classList.add("approaching--second"),e.classList.add("approached")},onOverlap:function(t,e){t.classList.remove("approaching--second"),e.classList.remove("approached"),t.classList.add("overlapping--second"),e.classList.add("overlapped")}});var u=new n.Lappy;u.addActiveObject(l),u.watch()}},function(t,e,o){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=r(t);if(e){var a=r(this).constructor;o=Reflect.construct(n,arguments,a)}else o=n.apply(this,arguments);return c(this,o)}}function c(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,e,o){return e&&l(t.prototype,e),o&&l(t,o),t}Object.defineProperty(e,"__esModule",{value:!0}),e.Lappy=e.ActiveOverlapObject=e.BasicOverlapObject=e.GraphicalTest=void 0;var h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t);var o={context:void 0,approachColor:"red"},n=x(o,e);this.context=n.context,this.approachColor=n.approachColor,this.paused=!1}return d(t,[{key:"displayCoordinates",value:function(t){this.context.beginPath(),this.context.fillStyle="black",this.context.textAlign="center",this.context.textBaseline="middle",this.context.fillText("x:".concat(~~t.htmlCoordinates[0].x,", y:").concat(~~t.htmlCoordinates[0].y),~~t.htmlCoordinates[0].x,~~t.htmlCoordinates[0].y-15),this.context.fillText("x:".concat(~~t.htmlCoordinates[1].x,", y:").concat(~~t.htmlCoordinates[1].y),~~t.htmlCoordinates[1].x,~~t.htmlCoordinates[1].y-15),this.context.fillText("x:".concat(~~t.htmlCoordinates[2].x,", y:").concat(~~t.htmlCoordinates[2].y),~~t.htmlCoordinates[2].x,15+~~t.htmlCoordinates[2].y),this.context.fillText("x:".concat(~~t.htmlCoordinates[3].x,", y:").concat(~~t.htmlCoordinates[3].y),~~t.htmlCoordinates[3].x,15+~~t.htmlCoordinates[3].y),this.context.closePath()}},{key:"drawApproachArea",value:function(t){this.context.beginPath(),this.context.strokeStyle=this.approachColor,this.context.setLineDash([5,10]),this.context.strokeRect(t.coordinates[0].x,t.coordinates[0].y,t.coordinates[2].x-t.coordinates[0].x,t.coordinates[2].y-t.coordinates[0].y),this.context.stroke(),this.context.closePath()}},{key:"display",value:function(t){if(this.displayCoordinates(t),(t.offset.x||t.offset.y)&&this.drawApproachArea(t),t.active&&t.trackedObjects.length)for(var e=0;e<t.trackedObjects.length;e++)this.display(t.trackedObjects[e].object)}},{key:"clearTestDisplay",value:function(){this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)}},{key:"pause",value:function(){this.clearTestDisplay(),this.paused=!0}},{key:"resume",value:function(){this.paused=!1}}]),t}();e.GraphicalTest=h;var u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t);var o={html:void 0,offset:{x:0,y:0},axis:{x:!0,y:!0}},n=e?x(o,e):o;this.HTML=n.html,this.offset=n.offset,this.axis=n.axis,this.active=!1,this.htmlCoordinates=y(n.html),this.coordinates=v(n.html,n.offset,n.axis)}return d(t,[{key:"updateCoordinates",value:function(){this.htmlCoordinates=y(this.HTML),this.coordinates=v(this.HTML,this.offset,this.axis)}}]),t}();e.BasicOverlapObject=u;var p=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(o,t);var e=i(o);function o(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return s(this,o),(t=e.call(this,n)).active=!0,t.trackedObjects=[],t}return d(o,[{key:"updateCoordinates",value:function(){this.htmlCoordinates=y(this.HTML),this.coordinates=v(this.HTML,this.offset,this.axis);for(var t=0;t<this.trackedObjects.length;t++)this.trackedObjects[t].object.updateCoordinates()}},{key:"addTrackedObject",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={onApproach:function(t,e){return 1},onOverlap:function(t,e){return 1},onExit:function(t,e){return 1},onLeave:function(t,e){return 1}};this.trackedObjects.push({object:t,callbacks:x(o,e),lastOverlapData:{x:void 0,y:void 0}})}}]),o}(u);e.ActiveOverlapObject=p;var f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t),e.graphicalTest&&(this.graphicalTest=new h(e.graphicalTest)),this.overlapObjects=[]}return d(t,[{key:"addActiveObject",value:function(t){this.overlapObjects.push(t)}},{key:"resizeGraphicalTestCanvas",value:function(){this.graphicalTest.context.canvas.width=Math.max(document.documentElement.clientWidth,document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth),this.graphicalTest.context.canvas.height=Math.max(document.documentElement.clientHeight,document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight)}},{key:"checkOverlapY",value:function(t,e){return t.htmlCoordinates[2].y-e.htmlCoordinates[0].y>=0&&t.htmlCoordinates[2].y-e.htmlCoordinates[2].y<=0?1:t.htmlCoordinates[0].y-e.htmlCoordinates[2].y<=0&&t.htmlCoordinates[0].y-e.htmlCoordinates[0].y>=0?-1:t.coordinates[2].y-e.coordinates[0].y>=0&&t.coordinates[2].y-e.coordinates[2].y<=0?2:t.coordinates[0].y-e.coordinates[2].y<=0&&t.coordinates[0].y-e.coordinates[0].y>=0?-2:0}},{key:"checkOverlapX",value:function(t,e){return t.htmlCoordinates[2].x-e.htmlCoordinates[0].x>=0&&t.htmlCoordinates[2].x-e.htmlCoordinates[2].x<=0?1:t.htmlCoordinates[0].x-e.htmlCoordinates[2].x<=0&&t.htmlCoordinates[0].x-e.htmlCoordinates[0].x>=0?-1:t.coordinates[2].x-e.coordinates[0].x>=0&&t.coordinates[2].x-e.coordinates[2].x<=0?2:t.coordinates[0].x-e.coordinates[2].x<=0&&t.coordinates[0].x-e.coordinates[0].x>=0?-2:0}},{key:"updateCoordinates",value:function(){for(var t=0;t<this.overlapObjects.length;t++)this.overlapObjects[t].updateCoordinates()}},{key:"calculateOverlap",value:function(t,e){var o=this.checkOverlapX(t,e),n=this.checkOverlapY(t,e);return{x:t.axis.x?o:n,y:t.axis.y?n:o}}},{key:"checkOverlap",value:function(t,e){var o=this.calculateOverlap(t,e.object);o.x&&o.y?Math.abs(o.x)===Math.abs(o.y)?o.x%2==0&&o.y%2==0?(o.x+e.lastOverlapData.x)%3==0&&o.x*e.lastOverlapData.x>0&&o.x%2==0||(o.y+e.lastOverlapData.y)%3==0&&o.y*e.lastOverlapData.y>0&&o.y%2==0?e.callbacks.onExit(t.HTML,e.object.HTML):e.callbacks.onApproach(t.HTML,e.object.HTML):e.callbacks.onOverlap(t.HTML,e.object.HTML):o.x%2!=0&&o.y%2!=0||((o.x+e.lastOverlapData.x)%3==0&&o.x*e.lastOverlapData.x>0&&o.x%2==0||(o.y+e.lastOverlapData.y)%3==0&&o.y*e.lastOverlapData.y>0&&o.y%2==0?e.callbacks.onExit(t.HTML,e.object.HTML):e.callbacks.onApproach(t.HTML,e.object.HTML)):o.x&&o.y||!e.lastOverlapData.x||!e.lastOverlapData.y||e.callbacks.onLeave(t.HTML,e.object.HTML),e.lastOverlapData=o}},{key:"displayGraphicalTest",value:function(){this.updateCoordinates(),this.graphicalTest.clearTestDisplay();for(var t=0;t<this.overlapObjects.length;t++)this.graphicalTest.display(this.overlapObjects[t])}},{key:"addGraphicalTest",value:function(t){if(this.graphicalTest)throw"Graphical test already initialised!";this.graphicalTest=new h(t),this.resizeGraphicalTestCanvas()}},{key:"watch",value:function(){this.updateCoordinates(),this.graphicalTest&&!this.graphicalTest.paused&&this.displayGraphicalTest();for(var t=0;t<this.overlapObjects.length;t++)for(var e=this.overlapObjects[t],o=0;o<e.trackedObjects.length;o++)this.checkOverlap(e,e.trackedObjects[o])}}]),t}();function y(t){var e=[],o=t.offsetWidth,n=t.offsetHeight;return e[0]={y:t.getBoundingClientRect().y+window.scrollY,x:t.getBoundingClientRect().x+window.scrollX},e[1]={y:t.getBoundingClientRect().y+window.scrollY,x:t.getBoundingClientRect().x+window.scrollX+o},e[2]={y:t.getBoundingClientRect().y+window.scrollY+n,x:t.getBoundingClientRect().x+window.scrollX+o},e[3]={y:t.getBoundingClientRect().y+window.scrollY+n,x:t.getBoundingClientRect().x+window.scrollX},e}function v(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{x:void 0,y:void 0},n=[],a=t.offsetWidth,i=t.offsetHeight;return n[0]={y:o.y?t.getBoundingClientRect().y+window.scrollY-e.y:0,x:o.x?t.getBoundingClientRect().x+window.scrollX-e.x:0},n[1]={y:o.y?t.getBoundingClientRect().y+window.scrollY-e.y:0,x:o.x?t.getBoundingClientRect().x+window.scrollX+a+e.x:window.innerWidth},n[2]={y:o.y?t.getBoundingClientRect().y+window.scrollY+i+e.y:window.innerHeight,x:o.x?t.getBoundingClientRect().x+window.scrollX+a+e.x:window.innerWidth},n[3]={y:o.y?t.getBoundingClientRect().y+window.scrollY+i+e.y:window.innerHeight,x:o.x?t.getBoundingClientRect().x+window.scrollX-e.x:0},n}function x(t,e,o){for(var a in t)e.hasOwnProperty(a)&&("object"===n(e[a])&&o?x(t[a],e[a],!0):t[a]=e[a]);return t}e.Lappy=f}]);