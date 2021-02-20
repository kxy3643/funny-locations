import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as fb from "./firebase.js";

let wordList;

//Main Init
function init(){
	map.initMap();
	fb.initFirebase();
	setupUI();
}

let controls = Object.seal({
	menu: false,
	dark: false
});

//UI Setup
function setupUI(){
	//Read stored style
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

	//Override CSS rules
	let geocoderInput = document.querySelector(".mapboxgl-ctrl-geocoder--input");
	geocoderInput.classList.add("browser-default");
	let geocoderSug = document.querySelector(".suggestions");
	geocoderSug.classList.add("browser-default");
	
	//Menu toggle
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

	//Hook random button
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

	//Modal hook
	//Grabbed from: https://materializecss.com/modals.html#!
	let Modalelem = document.querySelector('.modal');
	let instance = M.Modal.init(Modalelem);
	let modalContent = document.querySelector(".modal-content");
	modalContent.style.padding = "24px 24px 0px 24px";
	let modalConfirm = document.querySelector(".modal-footer");
	modalConfirm.style.margin = "0px 0px 24px 0px"
	
	//Modal open hook
	let submitButton = document.querySelector("#submitButton");
	submitButton.addEventListener('click', () => {
		instance.open();
	});

	//Submit button hook, send data to profanity filter
	let submitButtonDatabase = document.querySelector("#submitButtonDatabase");
	let submitInput = document.querySelector("#sumbitInput");
	submitButtonDatabase.addEventListener('click', () => {
		badWordChecker(submitInput.value);
		submitInput.value = "";
	});
	
	//Mode toggle hook and store
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

	//Init the counter
	updateCounter();
}

//Check for profanity
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

//Helper function to update the counter
//A little expensive, but it works for now
function updateCounter()
{
	Promise.resolve(fb.getWords()).then((value)=>{
		wordList = value;
		let countText = document.querySelector("#count");
		countText.innerHTML = `Current # of Locations: ${wordList.length}`;
	});
}


export {init};