import * as map from "./map.js";
import * as ajax from "./ajax.js";

let poi;

function loadPOI()
{
	const url = "https://igm.rit.edu/~acjvks/courses/shared/330/maps/igm-points-of-interest.php";

	function poiLoaded(jsonString){
		poi = JSON.parse(jsonString);
		console.log(poi);

		for(let p of poi){
			map.addMarkers(p.coordinates, p.title, "A POI!", "poi")
		}
	}

	ajax.downloadFile(url,poiLoaded);
}

function init(){
	map.initMap();
	setupUI();
}

function setupUI(){
	// it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
	const lnglatRIT = [-77.67454147338866, 43.08484339838443];
}


export {init};