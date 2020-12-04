import * as map from "./map.js";

let database;

function initFirebase(){
    let firebaseConfig = {
        apiKey: "AIzaSyBZIGOVZoVgkz5UwrIBHfv9Sab1vX12UWo",
        authDomain: "project-330-3-kxy3643.firebaseapp.com",
        projectId: "project-330-3-kxy3643",
        databaseURL: "project-330-3-kxy3643-default-rtdb.firebaseio.com/",
        storageBucket: "project-330-3-kxy3643.appspot.com",
        messagingSenderId: "722311758626",
        appId: "1:722311758626:web:9c80448fb175443dd11b7b",
        measurementId: "G-BJ9PKH6HTZ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // #1 - get a reference to the databse
    database = firebase.database();

    let data = {
        name: "Wabbit",
    };

    // #4 - send data, in this case we are adding it to the `scores` node
    //ref.push(data);
}

function getWord(){
    let list = [];
    firebase.database().ref("location").on("value", dataGet, firebaseError);
    function dataGet(data){
        let obj = data.val();
        for(let key in obj)
        {
            list.push(obj[key].name);
        }
        let index = Math.floor(Math.random() * list.length);
        map.geocoder.query(list[index]);
    }
	
    function firebaseError(error){
        console.log(error);
    }

    
}

export {initFirebase, database, getWord}