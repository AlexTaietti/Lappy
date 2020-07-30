class GraphicalTest {

	constructor(options = {}){
		this.context = options.context || undefined;
		this.approachColor = options.approachStroke || 'red';
		this.approachFill = options.approachFill || 'red';
		this.paused = false;
	}

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

	drawApproachArea (target) {
		this.context.beginPath();
		this.context.strokeStyle = this.approachColor;
		this.context.setLineDash([5, 10]);
		this.context.strokeRect(target.coordinates[0].x, target.coordinates[0].y, target.coordinates[2].x - target.coordinates[0].x, target.coordinates[2].y - target.coordinates[0].y);
		this.context.moveTo(0, target.offset);
		this.context.lineTo(window.innerWidth, target.offset);
		this.context.stroke();
		this.context.closePath();
	}


	display (target) {
		this.displayCoordinates(target);
		if (target.offset.x || target.offset.y) this.drawApproachArea(target);
		if(target.active && target.trackedObjects.length){
			for(let i = 0; i < target.trackedObjects.length; i ++){
				this.display(target.trackedObjects[i].object);
			}
		}
	}

	clearTestDisplay () {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	pause () {
		this.clearTestDisplay();
		this.paused = true;
	}

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
		
		//html
		this.HTML            = completeOptions.html;
		this.htmlClass       = completeOptions.html.classList;
		
		//object data
		this.offset          = (!isNaN(completeOptions.offset) && completeOptions.offset > 0) ? {x: 0, y: completeOptions.offset} : completeOptions.offset;
		this.axis            = completeOptions.axis;
		this.active          = false;
		this.htmlCoordinates = getInnerCoords(completeOptions.html);
		this.coordinates     = getOuterCoords(completeOptions.html, completeOptions.offset);
	
	}


	updateCoordinates () {
		this.htmlCoordinates = getInnerCoords(this.HTML);
		this.coordinates     = getOuterCoords(this.HTML, this.offset);
	}


}


class ActiveOverlapObject extends BasicOverlapObject {

	constructor(options = {}) {

		super(options);

		//this boi is active
		this.active = true;

		//passive objects this boiii can interact with
		this.trackedObjects = [];

	}

	updateCoordinates () {
		this.htmlCoordinates = getInnerCoords(this.HTML);
		this.coordinates     = getOuterCoords(this.HTML, this.offset);
		for(let i = 0; i < this.trackedObjects.length; i++) {
			this.trackedObjects[i].object.updateCoordinates();
		}
	}

	addTrackedObject (overlapObject, callbacks = {}) {

		//default callbacks
		const defaults = {
			onApproach: function  (main, check) { console.log(`I <${main.classList}> am approaching something!`); },
			onOverlap:  function  (main, check) { console.log(`I <${main.classList}> am overlapping something!`); },
			onExit:     function  (main, check) { console.log(`I <${main.classList}> am exiting something!`); },
			onLeave:    function  (main, check) { console.log(`I <${main.classList}> am leaving something!`); }
		};

		this.trackedObjects.push({

			object: overlapObject,
			callbacks: callbacks || defaults,
			lastOverlapData: {x: undefined, y: undefined}

		});

	}

}





class Lappy {


	constructor (options = {}) {
		if(options.graphicalTest) this.graphicalTest = new GraphicalTest(options.graphicalTest);
		this.overlapObjects = [];
	}


	addActiveObject (newOverlapObject) {
		this.overlapObjects.push(newOverlapObject);
	}


	updateGraphicalTest () {
		this.graphicalTest.context.canvas.width = document.body.offsetWidth;
		this.graphicalTest.context.canvas.height = document.body.offsetHeight;
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


	updateCoordinates () {
		for(let i = 0; i < this.overlapObjects.length; i++){
			this.overlapObjects[i].updateCoordinates();
		}
	}


	calculateOverlap (main, check){

		let overlapX = this.checkOverlapX(main, check);
		let overlapY = this.checkOverlapY(main, check);

		return {
			x: main.axis.x ? overlapX : overlapY,
			y: main.axis.y ? overlapY : overlapX
		}
	
	}


	//if neither of the two objects involved in the overlap have an offset property the only two callbacks executed will be "onOverlap" and "onLeave" ("definitely something I'll fix soon!")
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

		this.graphicalTest.clearTestDisplay();
		for(let i = 0; i < this.overlapObjects.length; i++){
			this.graphicalTest.display(this.overlapObjects[i]);
		}

	}


	addGraphicalTest (graphicalTestData) {

		if(!this.graphicalTest){
			this.graphicalTest = new GraphicalTest(graphicalTestData);
		} else {
			throw 'Graphical test already initialised!';
		}

	}


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


function getOuterCoords(element, offset = 0) {
	let coords = [], w = element.offsetWidth, h = element.offsetHeight;
	coords[0] = {
		y: element.getBoundingClientRect().y + window.scrollY - offset.y,
		x: element.getBoundingClientRect().x + window.scrollX - offset.x
	};
	coords[1] = {
		y: element.getBoundingClientRect().y + window.scrollY - offset.y,
		x: element.getBoundingClientRect().x + window.scrollX + w + offset.x
	};
	coords[2] = {
		y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
		x: element.getBoundingClientRect().x + window.scrollX + w + offset.x
	};
	coords[3] = {
		y: element.getBoundingClientRect().y + window.scrollY + h + offset.y,
		x: element.getBoundingClientRect().x + window.scrollX - offset.x
	};
	return coords;
}



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


export { GraphicalTest, BasicOverlapObject, ActiveOverlapObject, Lappy }