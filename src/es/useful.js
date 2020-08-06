import {BasicOverlapObject, ActiveOverlapObject, Lappy} from './Lappy.js'; //import Lappy


//window.onload = function () {

  //toggle an element's css class
	function toggleClass(element, CSSClass){

		if(element.classList.contains(CSSClass)){

			element.classList.remove(CSSClass);

		} else {

			element.classList.add(CSSClass);

		}

	}

  const $  = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  const $hamburger      = $(".header__hamburger");
  const $hamburgerInner = $(".hamburger__inner");
  const $navigation     = $(".navigation");
  const $header         = $(".header");
  const $$badContrast   = $$(".content__section:nth-child(even)");

  const headerOverlap = new ActiveOverlapObject($header);

  headerOverlap.addTrackedObject($$badContrast, {

  		onOverlap: function (main, check) {

  			$header.classList.add('scrolled');
  			$navigation.classList.add('scrolled');

  		},

  		onLeave: function (main, check) {

  			$header.classList.remove('scrolled');
  			$navigation.classList.remove('scrolled');

  		}

  	});

    //console.log(headerOverlap.trackedObjects[0].callbacks.onLeave.toString());

	const L = new Lappy();

	L.addActiveObject(headerOverlap);

  $hamburger.onclick = function(){

  		toggleClass($hamburger, 'is-active');
  		toggleClass($navigation, 'is-open');

  	};

    window.addEventListener('scroll', function(){

      L.watch();

    });

    L.watch();


//}
