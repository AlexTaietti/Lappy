import {Util} from './Util.js';

export class BasicOverlapObject {


	constructor (htmlElement, {offset, axis} = {}) {

		const _defaults = {
			offset: {x: 0, y: 0},
			axis: { x: true, y: true }
		};

		// object's HTML
		this.HTML = htmlElement;

		// object data
		this.offset          = offset || _defaults.offset;
		this.axis            = axis   || _defaults.axis;
		this.active          = false;
		this.htmlCoordinates = Util.getInnerCoords(htmlElement);
		this.coordinates     = Util.getOuterCoords(htmlElement, this.offset, this.axis);

	}

	// update both the coordinates of the actual HTML element as well as the imaginary offset bounding box surrounding it
	updateCoordinates () {
		this.htmlCoordinates = Util.getInnerCoords(this.HTML);
		this.coordinates     = Util.getOuterCoords(this.HTML, this.offset, this.axis);
	}


}
