class GraphicalTest {


	constructor(options = {}){

		const defaults = {
			context: undefined,
			approachColor: 'red'
		};

		const completeOptions = mergeObjects(defaults, options);

		// context options (more coming soon!)
		this.context       = completeOptions.context;
		this.approachColor = completeOptions.approachColor;

		// paused flag
		this.paused = false;
	
	}

	// display the coordinates of each vertex of the target (aka the current element) relative to the document's top left corner
	// basically the space used to represent the elements is the inverse first quadrant of a 2D plane
	displayCoordinates (target) {
		this.context.beginPath();
		this.context.fillStyle = "black";
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText(`x:${~~target.htmlCoordinates[0].x}, y:${~~target.htmlCoordinates[0].y}`, ~~target.htmlCoordinates[0].x, ~~target.htmlCoordinates[0].y - 15);
		this.context.fillText(`x:${~~target.htmlCoordinates[1].x}, y:${~~target.htmlCoordinates[1].y}`, ~~target.htmlCoordinates[1].x, ~~target.htmlCoordinates[1].y - 15);
		this.context.fillText(`x:${~~target.htmlCoordinates[2].x}, y:${~~target.htmlCoordinates[2].y}`, ~~target.htmlCoordinates[2].x, ~~target.htmlCoordinates[2].y + 15);
		this.context.fillText(`x:${~~target.htmlCoordinates[3].x}, y:${~~target.htmlCoordinates[3].y}`, ~~target.htmlCoordinates[3].x, ~~target.htmlCoordinates[3].y + 15);
		this.context.closePath();
	}

	//draw a dashed line on the outer area of the object
	drawApproachArea (target) {
		this.context.beginPath();
		this.context.strokeStyle = this.approachColor;
		this.context.setLineDash([5, 10]);
		this.context.strokeRect(target.coordinates[0].x, target.coordinates[0].y, target.coordinates[2].x - target.coordinates[0].x, target.coordinates[2].y - target.coordinates[0].y);
		this.context.stroke();
		this.context.closePath();
	}

	// display the target on the graphical test canvas
	display (target) {
		this.displayCoordinates(target);
		if (target.offset.x || target.offset.y) this.drawApproachArea(target);
		if(target.active && target.trackedObjects.length){
			for(let i = 0; i < target.trackedObjects.length; i ++){
				this.display(target.trackedObjects[i].object);
			}
		}
	}

	// clear the graphicla test's display
	clearTestDisplay () {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	//pause graphical test
	pause () {
		this.clearTestDisplay();
		this.paused = true;
	}

	//resume graphical test
	resume () { this.paused = false; }


}



class BasicOverlapObject {


	constructor (options = {}) {
		
		const defaults = {
			html: undefined,
			offset: {x: 0, y: 0},
			axis: { x: true, y: true }
		};
		
		const completeOptions = options ? mergeObjects(defaults, options) : defaults;
		
		// Object's HTML
		this.HTML = completeOptions.html;
		
		// object data
		this.offset          = completeOptions.offset;
		this.axis            = completeOptions.axis;
		this.active          = false;
		this.htmlCoordinates = getInnerCoords(completeOptions.html);
		this.coordinates     = getOuterCoords(completeOptions.html, completeOptions.offset, completeOptions.axis);
	
	}

	// update both the coordinates of the actual HTML element as well as the imaginary offset bounding box surrounding it
	updateCoordinates () {
		this.htmlCoordinates = getInnerCoords(this.HTML);
		this.coordinates     = getOuterCoords(this.HTML, this.offset, this.axis);
	}


}



class ActiveOverlapObject extends BasicOverlapObject {


	constructor(options = {}) {

		// invoke super class constructor (aka BasicOverlapObject's constructor)
		super(options);

		// this boi is active
		this.active = true;

		// passive objects this boiii can interact with
		this.trackedObjects = [];

	}

	// update the active element's coordinates as well as the coordinates of the basic objects it may interact with
	updateCoordinates () {
		
		this.htmlCoordinates = getInnerCoords(this.HTML);
		this.coordinates     = getOuterCoords(this.HTML, this.offset, this.axis);
		
		for(let i = 0; i < this.trackedObjects.length; i++) {
			this.trackedObjects[i].object.updateCoordinates();
		}
	
	}

	// add a new basic object this active one can interact with
	addTrackedObject (overlapObject, callbacks = {}) {

		//default callbacks
		const defaults = {
			onApproach: function  (main, check) { return 1; },
			onOverlap:  function  (main, check) { return 1; },
			onExit:     function  (main, check) { return 1; },
			onLeave:    function  (main, check) { return 1; }
		};

		this.trackedObjects.push({

			object: overlapObject,

			callbacks: mergeObjects(defaults, callbacks),
			
			lastOverlapData: {x: undefined, y: undefined}

		});

	}


}



class Lappy {


	constructor (options = {}) {
		if(options.graphicalTest) this.graphicalTest = new GraphicalTest(options.graphicalTest);
		this.overlapObjects = [];
	}

	// add one more active object to be tracked by Lappy
	addActiveObject (newOverlapObject) {
		this.overlapObjects.push(newOverlapObject);
	}

	// resize the graphical test canvas' dimensions (to be called whenever the window is resized)
	resizeGraphicalTestCanvas () {
		this.graphicalTest.context.canvas.width = getDocumentWidth();
		this.graphicalTest.context.canvas.height = getDocumentHeight();
	}

	checkOverlapY (main, check) {
		if(main.htmlCoordinates[2].y - check.htmlCoordinates[0].y >= 0 && main.htmlCoordinates[2].y - check.htmlCoordinates[2].y <= 0) { return 1; }
		if(main.htmlCoordinates[0].y - check.htmlCoordinates[2].y <= 0 && main.htmlCoordinates[0].y - check.htmlCoordinates[0].y >= 0) { return -1; }
		if(main.coordinates[2].y - check.coordinates[0].y >= 0 && main.coordinates[2].y - check.coordinates[2].y <= 0) { return 2; }
		if(main.coordinates[0].y - check.coordinates[2].y <= 0 && main.coordinates[0].y - check.coordinates[0].y >= 0) { return -2; }
		return 0;
	}

	checkOverlapX (main, check) {
		if(main.htmlCoordinates[2].x - check.htmlCoordinates[0].x >= 0 && main.htmlCoordinates[2].x - check.htmlCoordinates[2].x <= 0) { return 1; }
		if(main.htmlCoordinates[0].x - check.htmlCoordinates[2].x <= 0 && main.htmlCoordinates[0].x - check.htmlCoordinates[0].x >= 0) { return -1; }
		if(main.coordinates[2].x - check.coordinates[0].x >= 0 && main.coordinates[2].x - check.coordinates[2].x <= 0) { return 2; }
		if(main.coordinates[0].x - check.coordinates[2].x <= 0 && main.coordinates[0].x - check.coordinates[0].x >= 0) { return -2; }
		return 0;
	}

	// update every active object's coordinates (which will in turn update every one of its basic objects' coordinates)
	updateCoordinates () {
		for(let i = 0; i < this.overlapObjects.length; i++){
			this.overlapObjects[i].updateCoordinates();
		}
	}

	// detect any overlap between a target object (active) and a check (basic)
	calculateOverlap (main, check){

		let overlapX = this.checkOverlapX(main, check);
		let overlapY = this.checkOverlapY(main, check);

		return {
			x: main.axis.x ? overlapX : overlapY,
			y: main.axis.y ? overlapY : overlapX
		}
	
	}

	// for now if neither of the two objects involved in the overlap have an offset property the only two callbacks executed will be "onOverlap" and "onLeave" ("definitely something I'll fix soon!")
	checkOverlap (main, check) {
		
		let overlap = this.calculateOverlap(main, check.object);
		
		if(overlap.x && overlap.y){
			
			if(Math.abs(overlap.x) === Math.abs(overlap.y)){
			
				if(overlap.x % 2 === 0 && overlap.y % 2 === 0) {
			
					if( ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0) || ((overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) ){
			
						check.callbacks.onExit(main.HTML, check.object.HTML);
			
					} else {
			
						check.callbacks.onApproach(main.HTML, check.object.HTML);
					}
			
				} else {
			
					check.callbacks.onOverlap(main.HTML, check.object.HTML);
			
				}
			
			} else if(overlap.x % 2 === 0 || overlap.y % 2 === 0) {
			
				if( ((overlap.x + check.lastOverlapData.x) % 3 === 0 && overlap.x * check.lastOverlapData.x > 0 && overlap.x % 2 === 0) || ((overlap.y + check.lastOverlapData.y) % 3 === 0 && overlap.y * check.lastOverlapData.y > 0 && overlap.y % 2 === 0) ){
			
					check.callbacks.onExit(main.HTML, check.object.HTML);
			
				} else {
			
					check.callbacks.onApproach(main.HTML, check.object.HTML);
			
				}
			
			}
		
		} else if((!overlap.x || !overlap.y) && (check.lastOverlapData.x && check.lastOverlapData.y)) {
		
			check.callbacks.onLeave(main.HTML, check.object.HTML);
		
		}
		
		check.lastOverlapData = overlap;
	
	}

	displayGraphicalTest () {

		this.updateCoordinates();
		this.graphicalTest.clearTestDisplay();
		for(let i = 0; i < this.overlapObjects.length; i++){
			this.graphicalTest.display(this.overlapObjects[i]);
		}

	}

	// initialise a graphical test for Lappy's current instance
	addGraphicalTest (graphicalTestData) {

		if(!this.graphicalTest){
			this.graphicalTest = new GraphicalTest(graphicalTestData);
			this.resizeGraphicalTestCanvas();
		} else {
			throw 'Graphical test already initialised!';
		}

	}

	// This is how the Lappy dooo...
	watch () {

		this.updateCoordinates();

		if(this.graphicalTest && !this.graphicalTest.paused){
			this.displayGraphicalTest();
		}
		
		for(let i = 0; i < this.overlapObjects.length; i++){
			let currentActive = this.overlapObjects[i];
			for(let r = 0; r < currentActive.trackedObjects.length; r++){
				this.checkOverlap(currentActive, currentActive.trackedObjects[r]);
			}
		}
	
	}


}



///////////////////////////
// FUNCTIONS & VARIABLES //
///////////////////////////


// get an HTML element's variables
function getInnerCoords (element) {
	
	let coords = [], w = element.offsetWidth, h = element.offsetHeight;
	
	coords[0] = {
		y: element.getBoundingClientRect().y + window.scrollY,
		x: element.getBoundingClientRect().x + window.scrollX
	};

	coords[1] = {
		y: element.getBoundingClientRect().y + window.scrollY,
		x: element.getBoundingClientRect().x + window.scrollX + w
	};

	coords[2] = {
		y: element.getBoundingClientRect().y + window.scrollY + h,
		x: element.getBoundingClientRect().x + window.scrollX + w
	};

	coords[3] = {
		y: element.getBoundingClientRect().y + window.scrollY + h,
		x: element.getBoundingClientRect().x + window.scrollX
	};
	
	return coords;

}

// get an overlapObject's outer apprach area's coordinates
function getOuterCoords(element, offset = 0, axis = {x: undefined, y: undefined}) {
	
	let coords = [], w = element.offsetWidth, h = element.offsetHeight;
	
	coords[0] = {
		y: axis.y ? (element.getBoundingClientRect().y + window.scrollY - offset.y) : 0,
		x: axis.x ? (element.getBoundingClientRect().x + window.scrollX - offset.x) : 0
	};
	
	coords[1] = {
		y: axis.y ? (element.getBoundingClientRect().y + window.scrollY - offset.y) : 0,
		x: axis.x ? (element.getBoundingClientRect().x + window.scrollX + w + offset.x) : window.innerWidth
	};
	
	coords[2] = {
		y: axis.y ? (element.getBoundingClientRect().y + window.scrollY + h + offset.y) : window.innerHeight,
		x: axis.x ? (element.getBoundingClientRect().x + window.scrollX + w + offset.x) : window.innerWidth
	};
	
	coords[3] = {
		y: axis.y ? (element.getBoundingClientRect().y + window.scrollY + h + offset.y) : window.innerHeight,
		x: axis.x ? (element.getBoundingClientRect().x + window.scrollX - offset.x) : 0
	};
	
	return coords;

}

// merge two objects by replacing each of the target's properties with the corresponding object's property if defined otherwise keep the target as is
function mergeObjects (target, object, deep) {
	
	for(let prop in target){
		if(object.hasOwnProperty(prop)){
			if(typeof object[prop] === "object"){
				if(deep){
					mergeObjects(target[prop], object[prop], true);
				} else {
					target[prop] = object[prop];
				}
			} else {
				target[prop] = object[prop];
			}
		}
	}

	return target;

}

// get the document's height cross browser reliably 
function getDocumentHeight() {
    
    return Math.max(
        
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    
    );

}

// get the document's width cross browser reliably
function getDocumentWidth() {
    
    return Math.max(
    
        document.documentElement.clientWidth,
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth
    
    );

}



export { GraphicalTest, BasicOverlapObject, ActiveOverlapObject, Lappy }