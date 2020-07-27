!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";var n=o(1);window.onload=function(){var t=document.querySelector.bind(document),e=(document.querySelectorAll.bind(document),t(".test-container.main")),o=t(".test-container.second"),i=t(".test-container.check"),a=t("#main-canvas"),r=a.getContext("2d");a.width=document.body.offsetWidth,a.height=document.body.offsetHeight,r.font="1rem sans-serif";var c=!1,s=!1;e.addEventListener("mousedown",(function(){c=!0})),document.addEventListener("mouseup",(function(){c&&(c=!1),s&&(s=!1)})),window.addEventListener("mousemove",(function(t){c&&(e.style.top="".concat(t.clientY-e.offsetHeight/2,"px"),e.style.left="".concat(t.clientX,"px"),u.watch())})),window.addEventListener("resize",(function(){u.updateGraphicalTest(),u.watch()})),document.addEventListener("scroll",(function(){u.watch()}));var l=new n.ActiveOverlapObject({html:e,offset:{x:30,y:50},onApproach:function(t){t.style.backgroundColor="red"},onLeave:function(t){t.style.backgroundColor="#d9514e"},onExit:function(t,e){e.style=null},onOverlap:function(t,e){t.style.backgroundColor="blue",e.style.backgroundColor="red"}}),d=new n.BasicOverlapObject({html:i,offset:{x:20,y:40}}),h=new n.BasicOverlapObject({html:o,offset:{x:30,y:20}});l.addTrackedObject(d),l.addTrackedObject(h);var u=new n.Lappy({graphicalTest:{context:r}});u.addActiveObject(l),u.watch()}},function(t,e,o){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=c(t);if(e){var i=c(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return r(this,o)}}function r(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function d(t,e,o){return e&&l(t.prototype,e),o&&l(t,o),t}Object.defineProperty(e,"__esModule",{value:!0}),e.Lappy=e.ActiveOverlapObject=e.BasicOverlapObject=e.GraphicalTest=void 0;var h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t),this.context=e.context||void 0,this.approachColor=e.approachStroke||"red",this.approachFill=e.approachFill||"red"}return d(t,[{key:"displayCoordinates",value:function(t){this.context.beginPath(),this.context.fillStyle="black",this.context.textAlign="center",this.context.textBaseline="middle",this.context.fillText("x:".concat(~~t.htmlCoordinates[0].x,", y:").concat(~~t.htmlCoordinates[0].y),~~t.htmlCoordinates[0].x,~~t.htmlCoordinates[0].y-15),this.context.fillText("x:".concat(~~t.htmlCoordinates[1].x,", y:").concat(~~t.htmlCoordinates[1].y),~~t.htmlCoordinates[1].x,~~t.htmlCoordinates[1].y-15),this.context.fillText("x:".concat(~~t.htmlCoordinates[2].x,", y:").concat(~~t.htmlCoordinates[2].y),~~t.htmlCoordinates[2].x,15+~~t.htmlCoordinates[2].y),this.context.fillText("x:".concat(~~t.htmlCoordinates[3].x,", y:").concat(~~t.htmlCoordinates[3].y),~~t.htmlCoordinates[3].x,15+~~t.htmlCoordinates[3].y),this.context.closePath()}},{key:"drawApproachArea",value:function(t){(t.offset.x||t.offset.y)&&(this.context.beginPath(),this.context.strokeStyle=this.approachColor,this.context.setLineDash([5,10]),this.context.strokeRect(t.coordinates[0].x,t.coordinates[0].y,t.coordinates[2].x-t.coordinates[0].x,t.coordinates[2].y-t.coordinates[0].y),this.context.moveTo(0,t.offset),this.context.lineTo(window.innerWidth,t.offset),this.context.stroke(),this.context.closePath())}},{key:"display",value:function(t){if(this.displayCoordinates(t),t.offset&&this.drawApproachArea(t),t.active)for(p=0;p<t.trackedObjects.length;p++)this.display(t.trackedObjects[p])}}]),t}();e.GraphicalTest=h;var u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t);var o={html:void 0,offset:{x:0,y:0},axis:{x:!0,y:!0}},n=e?k(o,e):o;this.HTML=n.html,this.htmlClass=n.html.classList,this.offset=!isNaN(n.offset)&&n.offset>0?{x:0,y:n.offset}:n.offset,this.axis=n.axis,this.active=!1,this.htmlCoordinates=j(n.html),this.coordinates=T(n.html,n.offset),this.lastOverlapData={x:void 0,y:void 0}}return d(t,[{key:"updateCoordinates",value:function(){this.htmlCoordinates=j(this.HTML),this.coordinates=T(this.HTML,this.offset)}}]),t}();e.BasicOverlapObject=u;var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(o,t);var e=a(o);function o(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,o);var i={onApproach:function(t,e){console.log("I <".concat(t.classList,"> am approaching something!"))},onOverlap:function(t,e){console.log("I <".concat(t.classList,"> am overlapping something!"))},onExit:function(t,e){console.log("I <".concat(t.classList,"> am exiting something!"))},onLeave:function(t,e){console.log("I <".concat(t.classList,"> am leaving something!"))}};return(t=e.call(this,n)).active=!0,t.onOverlap=n.onOverlap||i.onOverlap,t.onApproach=n.onApproach||i.onApproach,t.onExit=n.onExit||i.onExit,t.onLeave=n.onLeave||i.onLeave,t.trackedObjects=[],t}return d(o,[{key:"updateCoordinates",value:function(){for(this.htmlCoordinates=j(this.HTML),this.coordinates=T(this.HTML,this.offset),p=0;p<this.trackedObjects.length;p++)this.trackedObjects[p].updateCoordinates()}},{key:"addTrackedObject",value:function(t){this.trackedObjects.push(t)}}]),o}(u);e.ActiveOverlapObject=f;var p,y,x,v,g,m,b,O,C,w=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t),e.graphicalTest&&(this.graphicalTest=new h(e.graphicalTest)),this.overlapObjects=[]}return d(t,[{key:"addActiveObject",value:function(t){this.overlapObjects.push(t)}},{key:"updateGraphicalTest",value:function(){this.graphicalTest.context.canvas.width=document.body.offsetWidth,this.graphicalTest.context.canvas.height=document.body.offsetHeight}},{key:"checkOverlapY",value:function(t,e){return t.htmlCoordinates[2].y-e.htmlCoordinates[0].y>=0&&t.htmlCoordinates[2].y-e.htmlCoordinates[2].y<=0?1:t.htmlCoordinates[0].y-e.htmlCoordinates[2].y<=0&&t.htmlCoordinates[0].y-e.htmlCoordinates[0].y>=0?-1:t.coordinates[2].y-e.coordinates[0].y>=0&&t.coordinates[2].y-e.coordinates[2].y<=0?2:t.coordinates[0].y-e.coordinates[2].y<=0&&t.coordinates[0].y-e.coordinates[0].y>=0?-2:0}},{key:"checkOverlapX",value:function(t,e){return t.htmlCoordinates[2].x-e.htmlCoordinates[0].x>=0&&t.htmlCoordinates[2].x-e.htmlCoordinates[2].x<=0?1:t.htmlCoordinates[0].x-e.htmlCoordinates[2].x<=0&&t.htmlCoordinates[0].x-e.htmlCoordinates[0].x>=0?-1:t.coordinates[2].x-e.coordinates[0].x>=0&&t.coordinates[2].x-e.coordinates[2].x<=0?2:t.coordinates[0].x-e.coordinates[2].x<=0&&t.coordinates[0].x-e.coordinates[0].x>=0?-2:0}},{key:"updateCoordinates",value:function(){for(p=0;p<this.overlapObjects.length;p++)this.overlapObjects[p].updateCoordinates()}},{key:"calculateOverlap",value:function(t,e){return O=this.checkOverlapX(t,e),C=this.checkOverlapY(t,e),{x:t.axis.x?O:C,y:t.axis.y?C:O}}},{key:"checkOverlap",value:function(t,e){(b=this.calculateOverlap(t,e)).x&&b.y?Math.abs(b.x)===Math.abs(b.y)?b.x%2==0&&b.y%2==0?(b.x+e.lastOverlapData.x)%3==0&&b.x*e.lastOverlapData.x>0&&b.x%2==0||(b.y+e.lastOverlapData.y)%3==0&&b.y*e.lastOverlapData.y>0&&b.y%2==0?t.onExit(t.HTML,e.HTML):t.onApproach(t.HTML,e.HTML):t.onOverlap(t.HTML,e.HTML):b.x%2!=0&&b.y%2!=0||((b.x+e.lastOverlapData.x)%3==0&&b.x*e.lastOverlapData.x>0&&b.x%2==0||(b.y+e.lastOverlapData.y)%3==0&&b.y*e.lastOverlapData.y>0&&b.y%2==0?t.onExit(t.HTML,e.HTML):t.onApproach(t.HTML,e.HTML)):b.x&&b.y||!e.lastOverlapData.x||!e.lastOverlapData.y||t.onLeave(t.HTML,e.HTML),e.lastOverlapData=b}},{key:"watch",value:function(){if(this.updateCoordinates(),this.graphicalTest)for(this.graphicalTest.context.clearRect(0,0,this.graphicalTest.context.canvas.width,this.graphicalTest.context.canvas.height),p=0;p<this.overlapObjects.length;p++)this.graphicalTest.display(this.overlapObjects[p]);for(p=0;p<this.overlapObjects.length;p++)for(v=0;v<this.overlapObjects[p].trackedObjects.length;v++)this.checkOverlap(this.overlapObjects[p],this.overlapObjects[p].trackedObjects[v])}}]),t}();function j(t){return y=[],g=t.offsetWidth,m=t.offsetHeight,y[0]={y:t.getBoundingClientRect().y+window.scrollY,x:t.getBoundingClientRect().x+window.scrollX},y[1]={y:t.getBoundingClientRect().y+window.scrollY,x:t.getBoundingClientRect().x+window.scrollX+g},y[2]={y:t.getBoundingClientRect().y+window.scrollY+m,x:t.getBoundingClientRect().x+window.scrollX+g},y[3]={y:t.getBoundingClientRect().y+window.scrollY+m,x:t.getBoundingClientRect().x+window.scrollX},y}function T(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return y=[],g=t.offsetWidth,m=t.offsetHeight,y[0]={y:t.getBoundingClientRect().y+window.scrollY-e.y,x:t.getBoundingClientRect().x+window.scrollX-e.x},y[1]={y:t.getBoundingClientRect().y+window.scrollY-e.y,x:t.getBoundingClientRect().x+window.scrollX+g+e.x},y[2]={y:t.getBoundingClientRect().y+window.scrollY+m+e.y,x:t.getBoundingClientRect().x+window.scrollX+g+e.x},y[3]={y:t.getBoundingClientRect().y+window.scrollY+m+e.y,x:t.getBoundingClientRect().x+window.scrollX-e.x},y}function k(t,e,o){for(x in t)e.hasOwnProperty(x)&&("object"===n(e[x])&&o?k(t[x],e[x],!0):t[x]=e[x]);return t}e.Lappy=w}]);