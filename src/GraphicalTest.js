import {Util} from './Util.js';

export class GraphicalTest {


	constructor(options = {}){

		const defaults = {
			context: undefined,
			approachColor: 'red'
		};

		const completeOptions = Util.mergeObjects(defaults, options);

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

	// draw a dashed line on the outer area of the object
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

	// clear the graphical test's display
	clearTestDisplay () {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	// pause graphical test
	pause () {
		this.clearTestDisplay();
		this.paused = true;
	}

	// resume graphical test
	resume () { this.paused = false; }


}
