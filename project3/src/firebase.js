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

    database = firebase.database();
}

async function getWords(){
    return await firebase.database().ref("location").once("value").then((snapshot) => {
        let list = [];
        let obj = snapshot.val();
        for(let key in obj)
        {
            list.push(obj[key].name);
        }
        return list;
    });
}

function submitData(value){
    let data = {
        name: `"${value}"`,
    };
    firebase.database().ref("location").push(data);
}

export {initFirebase, getWords, submitData}