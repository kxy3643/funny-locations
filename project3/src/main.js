import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as fb from "./firebase.js";

let wordList;

function init(){
	map.initMap();
	fb.initFirebase();
	setupUI();
}

let controls = Object.seal({
	menu: false,
	dark: false
});

function setupUI(){
	let menuButton = document.querySelector("#menu");
	let buttons = document.querySelector("#buttonContainer");
	menuButton.addEventListener('click', () => {
		if(controls.menu)
		{
			buttons.style.transform = "translate(0px,-200px)";
			buttons.style.opacity = "0";
			buttons.style.visibility = "hidden";
			menuButton.innerHTML = "Open Menu";
			controls.menu = false;
		}
		else
		{
			buttons.style.visibility = "visible";
			buttons.style.transform = "translate(0px,0px)";
			buttons.style.opacity = "1";
			menuButton.innerHTML = "Close Menu";
			controls.menu = true;
		}
	});

	let randButton = document.querySelector("#randomWord");
	randButton.addEventListener('click', () => {
		Promise.resolve(fb.getWords()).then((value)=>{
			wordList = value;
			let index = Math.floor(Math.random() * wordList.length);
        	map.searchLocation(wordList[index]);
		});
	});

	let submitButton = document.querySelector("#submitButton");
	submitButton.addEventListener('click', () => {
		
	});

	let darkButton = document.querySelector("#darkMode");
	darkButton.addEventListener('click', () => {
		if(controls.dark)
		{
			map.changeStyle('mapbox://styles/mapbox/streets-v11');
			controls.dark = false;
		}
		else
		{
			map.changeStyle('mapbox://styles/mapbox/dark-v10');
			controls.dark = true;
		}
	});
}


export {init};