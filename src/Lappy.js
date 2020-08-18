import {Util} from './Util.js';
import {GraphicalTest} from './GraphicalTest.js';

export class Lappy {


	constructor ({graphicalTest} = {}) {
		if(graphicalTest) this.graphicalTest = new GraphicalTest(graphicalTest);
		this.overlapObjects = [];
	}

	// add one more active object to be tracked by Lappy
	addActiveObject (newOverlapObject) {
		this.overlapObjects.push(newOverlapObject);
	}

	// resize the graphical test canvas' dimensions (to be called whenever the window is resized)
	resizeGraphicalTestCanvas () {
		this.graphicalTest.context.canvas.width = Util.getDocumentWidth();
		this.graphicalTest.context.canvas.height = Util.getDocumentHeight();
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

		const overlap = this.calculateOverlap(main, check.object);

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
