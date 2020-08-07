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

  const $hamburger = $(".header__hamburger");

	$hamburger.onclick = function(){
		toggleClass($hamburger, 'is-active');
		toggleClass($navigation, 'is-open');
	};

  const $navigation     = $(".navigation");
  const $header         = $(".header");
  const $$badContrast   = $$(".content__section:nth-child(even)");
	const $$allSections   = $$(".content__section");


	//create an ActiveOverlapObject (AOO)
  const headerOverlap = new ActiveOverlapObject($header);

	//AOOs can be fed other html elements (or nodes lists) whith witch they can interact..
	//The interactions are determined by the methods passed as the second argument of the method...
	//The 4 stages of overlap Lappy can handle are "onApproach", "onOverlap", "onExit" and finally "onLeave"...
	//To more clearely see when all of these events get triggered go back to Lappy's home page and click on "concept"
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

	//you can of course add tracked objects in multiple batches...
	//for now I don't have a system to detect duplicate elements in an AOO's list of tracked objects!
	headerOverlap.addTrackedObject($$allSections, {

		onOverlap: function (main, check) { check.querySelector('h1').classList.add('is-visible'); }

	});

	//A new Lappy is born!
	const L = new Lappy();

	//Lappy can be fed AOOs of which it will track the position...
	//the "watch" method needs to be called whenever you want to check the overlap state of Lappy's AOOs...
	//In this example I opted to call it whenever the window scroll event is fired
	L.addActiveObject(headerOverlap);

	//use "watch" to track the overlap state of every one of Lappy's AOOs (relative to their own tracked objects)
  window.addEventListener('scroll', function(){ L.watch(); });

  L.watch();


//}
