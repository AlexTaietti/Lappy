import {Util} from './Util.js';
import {BasicOverlapObject} from './BasicOverlapObject.js';

export class ActiveOverlapObject extends BasicOverlapObject {


	constructor(htmlElement, options = {}) {

		// invoke super class constructor (aka BasicOverlapObject's constructor)
		super(htmlElement, options);

		// this boi is active
		this.active = true;

		// passive objects this boiii can interact with
		this.trackedObjects = [];

	}

	// update the active element's coordinates as well as the coordinates of the basic objects it may interact with
	updateCoordinates () {

		this.htmlCoordinates = Util.getInnerCoords(this.HTML);
		this.coordinates     = Util.getOuterCoords(this.HTML, this.offset, this.axis);

		for(let i = 0; i < this.trackedObjects.length; i++) {
			this.trackedObjects[i].object.updateCoordinates();
		}

	}

	// add a new basic object this active one can interact with (can also be an HTML collection)
	addTrackedObject (overlapObject, callbacks = {}, options = {}) {

		// default callbacks
		const _defaultCallbacks = {
			onApproach: function  (main, check) { return 1; },
			onOverlap:  function  (main, check) { return 1; },
			onExit:     function  (main, check) { return 1; },
			onLeave:    function  (main, check) { return 1; }
		};

		if(NodeList.prototype.isPrototypeOf(overlapObject)){

			for(let i = 0; i < overlapObject.length; i++){

				this.trackedObjects.push({

					object: overlapObject instanceof BasicOverlapObject ? overlapObject : new BasicOverlapObject(overlapObject[i], options),

					callbacks: Util.mergeObjects(_defaultCallbacks, callbacks),

					lastOverlapData: {x: null, y: null}

				});

			}

		} else {

			this.trackedObjects.push({

				object: overlapObject instanceof BasicOverlapObject ? overlapObject : new BasicOverlapObject(overlapObject, options),

				callbacks: Util.mergeObjects(_defaultCallbacks, callbacks),

				lastOverlapData: {x: null, y: null}

			});

		}

	}


}
