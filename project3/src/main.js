import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as fb from "./firebase.js";


function loadRandomLocation()
{
	//Firebase request

	
}

function init(){
	map.initMap();
	fb.initFirebase();
	setupUI();
}


function setupUI(){
	// it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
	const lnglatRIT = [-77.67454147338866, 43.08484339838443];

	let randButton = document.querySelector("#randomWord");
	randButton.addEventListener('click', () => {
		fb.getWord();
	});
}


export {init};