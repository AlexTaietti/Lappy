import {BasicOverlapObject, graphicalTest, ActiveOverlapObject, Lappy} from './Lappy.js'; //import Lappy


window.onload = function () {


	////////////
	// THINGS //
	////////////
	const $  = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document);


	const main   = $('.test-container.main');
	const second = $('.test-container.second');
	const check  = $('.test-container.check');


	// Toggle graphical test
	const graphicalTestToggle = $('#graphicalTestToggle');

	graphicalTestToggle.addEventListener('click', function(){

		if(!L.graphicalTest) {
			L.addGraphicalTest({ context: mainCtx });
			L.displayGraphicalTest();
		} else {

			if(!L.graphicalTest.paused){

				L.graphicalTest.pause();

			} else {

				L.graphicalTest.resume();
				L.displayGraphicalTest();		

			}	

		}

	
	});


	//canvas set up
	const mainCanvas  = $('#main-canvas');
	const mainCtx     = mainCanvas.getContext('2d');
	mainCanvas.width  = document.body.offsetWidth;
	mainCanvas.height = document.body.offsetHeight;
	mainCtx.font      = "1rem sans-serif";


	//dragging flags
	let draggingMain = false;
	let draggingCheck = false;


	////////////
	// EVENTS //
	////////////
	main.addEventListener('mousedown', function(){ draggingMain = true; });

	main.addEventListener('touchstart', function(){ draggingMain = true; });


	document.addEventListener('mouseup', function(){
		if(draggingMain) { draggingMain = false; }
	});


	document.addEventListener('touchend', function(){
		if(draggingMain) { draggingMain = false; }
	});


	document.addEventListener('mousemove', function(e){

		if(draggingMain){
			main.style.top  = window.innerWidth >= 650 ?`${e.clientY - main.offsetHeight/2}px` : `${e.clientY}px`;
			main.style.left  = `${e.clientX}px`;
			L.watch();
		}

	});

	document.addEventListener('touchmove', function(e){

		if(draggingMain){
			main.style.top  = `${e.touches[0].clientY}px`;
			main.style.left  = `${e.touches[0].clientX}px`;
			L.watch();
		}

	});


	window.addEventListener('resize', function(){

		L.updateGraphicalTest();
		L.watch();

	});


	document.addEventListener('scroll', function(){ L.watch(); });


	////////////////
	// START DEMO //
	////////////////


	//Initialise the overlap objects
	const M = new ActiveOverlapObject({

		html: main,
		offset: window.innerWidth >= 768 ? { x: 30, y: 50 } : { x: 15, y: 25 },

		//IMPORTANT: changing an element's css inline through JS is not really great thats's why recommend manipulating the object's CSS class instead
		onApproach: function (main, check) {
			main.classList.add('approaching');
			check.classList.add('approaching');
		},

		onLeave: function (main, check) {
			main.classList.remove('approaching');
			check.classList.remove('approaching');
		},

		onExit: function(main, check) {
			main.classList.remove('overlapping');
			check.classList.remove('overlapping');
		},

		onOverlap: function (main, check) {

			main.classList.remove('approaching');
			check.classList.remove('approaching');
			
			main.classList.add('overlapping');
			check.classList.add('overlapping');
		}

	});


	const C = new BasicOverlapObject({

		html: check,
		offset: window.innerWidth >= 768 ? {x: 20, y: 40} : { x: 10, y: 20 }

	});


	const S = new BasicOverlapObject({

		html: second,
		offset: window.innerWidth >= 768 ? {x: 30, y: 20} : { x: 15, y: 10 }

	});


	M.addTrackedObject(C);
	M.addTrackedObject(S);


	//initialise Lappy
	const L = new Lappy();

	
	//add the overlap object to be watched (could be more than one) to lappy
	L.addActiveObject(M);


	//kick the demo off
	L.watch();


}