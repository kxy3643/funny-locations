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
	const storedMode = localStorage.getItem("controls.dark");
	if (storedMode != undefined){
		if(storedMode == "true"){controls.dark = true;}
		else{controls.dark = false;}
	}
	if(controls.dark){
		map.changeStyle('mapbox://styles/mapbox/dark-v10');
	}
	else{
		map.changeStyle('mapbox://styles/mapbox/streets-v11');
	}


	let geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder--input");
	geocoderInput.classList.add("browser-default");
	let geocoderSug = document.querySelector(".suggestions");
	geocoderSug.classList.add("browser-default");
	
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
			let countText = document.querySelector("#count");
			countText.innerHTML = `Current # of Locations: ${wordList.length}`;
		});
	});

	let Modalelem = document.querySelector('.modal');
	let instance = M.Modal.init(Modalelem);
	let modalContent = document.querySelector(".modal-content");
	modalContent.style.padding = "24px 24px 0px 24px";
	let modalConfirm = document.querySelector(".modal-footer");
	modalConfirm.style.margin = "0px 0px 24px 0px"
	
	let submitButton = document.querySelector("#submitButton");
	submitButton.addEventListener('click', () => {
		instance.open();
	});

	let submitButtonDatabase = document.querySelector("#submitButtonDatabase");
	let submitInput = document.querySelector("#sumbitInput");
	submitButtonDatabase.addEventListener('click', () => {
		badWordChecker(submitInput.value);
		//fb.submitData(submitInput.value);
		submitInput.value = "";
	});
	
	let darkButton = document.querySelector("#darkMode");
	darkButton.addEventListener('click', () => {
		if(controls.dark)
		{
			map.changeStyle('mapbox://styles/mapbox/streets-v11');
			controls.dark = false;
			localStorage.setItem("controls.dark", false);
		}
		else
		{
			map.changeStyle('mapbox://styles/mapbox/dark-v10');
			controls.dark = true;
			localStorage.setItem("controls.dark", true);
		}
	});

	updateCounter();
}

function badWordChecker(value){
	let url = "https://www.purgomalum.com/service/json?text=";
	url += value;

	let parse;
	function parsed(jsonString){
		parse = JSON.parse(jsonString);
		let stringCheck = parse.result;
		if(stringCheck != undefined)
		{
			if(!stringCheck.includes("*"))
			{
				fb.submitData(value);
				updateCounter();
			}
			else{
				alert("PLEASE BE CIVIL!");
			}
		}
	}

	ajax.downloadFile(url,parsed);
}

function updateCounter()
{
	Promise.resolve(fb.getWords()).then((value)=>{
		wordList = value;
		let countText = document.querySelector("#count");
		countText.innerHTML = `Current # of Locations: ${wordList.length}`;
	});
}


export {init};