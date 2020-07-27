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


	const mainCanvas  = $('#main-canvas');
	const mainCtx     = mainCanvas.getContext('2d');
	mainCanvas.width  = document.body.offsetWidth;
	mainCanvas.height = document.body.offsetHeight;
	mainCtx.font      = "1rem sans-serif";


	let draggingMain = false;
	let draggingCheck = false;


	////////////
	// EVENTS //
	////////////
	main.addEventListener('mousedown', function(){ draggingMain = true; });


	document.addEventListener('mouseup', function(){
		if(draggingMain) { draggingMain = false; }
		if(draggingCheck) { draggingCheck = false; }
	});


	window.addEventListener('mousemove', function(e){

		if(draggingMain){
			main.style.top  = `${e.clientY - main.offsetHeight/2}px`;
			main.style.left  = `${e.clientX}px`;
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
		offset: {x: 30, y: 50},

		//IMPORTANT: changing an element's css inline through JS is not really great, I used this just for the sake of this demo, I would recommend manipulating the object's CSS class intead
		onApproach: function (main) { main.style.backgroundColor = "red"; },
		onLeave: function (main) { main.style.backgroundColor = "#d9514e"; },
		onExit: function(main, check){ check.style = null; },
		onOverlap: function (main, check) {
			main.style.backgroundColor = "blue";
			check.style.backgroundColor = "red";
		}

	});


	const C = new BasicOverlapObject({

		html: check,
		offset: {x: 20, y: 40}

	});


	const S = new BasicOverlapObject({

		html: second,
		offset: {x: 30, y: 20}

	});


	M.addTrackedObject(C);
	M.addTrackedObject(S);


	//initialise Lappy
	const L = new Lappy({
		
		graphicalTest: { context: mainCtx }

	});

	
	//add the overlap object to be watched (could be more than one) to lappy
	L.addActiveObject(M);


	//kick the demo off
	L.watch();


}