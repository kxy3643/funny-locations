let map;
let geocoder;

function initMap(){
	mapboxgl.accessToken = 'pk.eyJ1Ijoia3h5MzY0MyIsImEiOiJja2htNnhyazEwNXJrMnFtM3dseXZobHo4In0.9wFd7wAqXOVrmTqeGOahVw';
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/dark-v10'
	});

	map.setZoom(15.5);
	map.setCenter([-77.67454147338866,43.08484339838443]);
	
	function forwardGeocoder(query)
	{
		let matchingFeatures = [];
		for (let i = 0; i < customData.features.length; i++)
		{
			let feature = customData.features[i];
			// handle queries with different capitalization than the source data by calling toLowerCase()
			if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) 
			{
				// add a tree emoji as a prefix for custom data results
				// using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
				feature['place_name'] = '🤡 ' + feature.properties.title;
				feature['center'] = feature.geometry.coordinates;
				matchingFeatures.push(feature);
			}
		}
		return matchingFeatures;
	}

	geocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		zoom: 14,
		placeholder: 'Search a funny word! It probably exists somewhere...',
		mapboxgl: mapboxgl,
		flyTo: {
			bearing: 0,
			speed: 2.5,
			curve: 1,
		},
		types: "address",
	})
	map.addControl(new mapboxgl.NavigationControl());
	document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
}

export {initMap, geocoder};