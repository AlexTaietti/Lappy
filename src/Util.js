export const Util = {

  // merge two objects by replacing each of the target's properties with the corresponding object's property if defined otherwise keep the target as is
  mergeObjects: (target, object, deep) => {

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

  },


  // get the document's height cross browser reliably
  getDocumentHeight: () => {

      return Math.max(

          document.documentElement.clientHeight,
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight

      );

  },

  // get the document's width cross browser reliably
  getDocumentWidth: () => {

      return Math.max(

          document.documentElement.clientWidth,
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth

      );

  },

  // get an HTML element's variables
  getInnerCoords: (element) => {

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

  },

  // get an overlapObject's outer apprach area's coordinates
  getOuterCoords: (element, offset = 0, axis = {x: null, y: null}) => {

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



}
