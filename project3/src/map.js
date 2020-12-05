let map;
let geocoder;

function initMap(){
	mapboxgl.accessToken = 'pk.eyJ1Ijoia3h5MzY0MyIsImEiOiJja2htNnhyazEwNXJrMnFtM3dseXZobHo4In0.9wFd7wAqXOVrmTqeGOahVw';
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11'
	});

	map.setZoom(15.5);
	map.setCenter([-77.67454147338866,43.08484339838443]);

	geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		zoom: 14,
		placeholder: 'Search a funny word! It exists somewhere in the world...',
		mapboxgl: mapboxgl,
		flyTo: {
			bearing: 0,
			speed: 2.5,
			curve: 1,
			zoom: 17.5,
		},
		types: "address"
	})
	map.addControl(new mapboxgl.NavigationControl());
	document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
}

function searchLocation(value){
	geocoder.clear();
	geocoder.query(value);
}

function changeStyle(value){
	map.setStyle(value);
}

export {initMap, searchLocation, changeStyle};