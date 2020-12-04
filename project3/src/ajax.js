function downloadFile(url, callbackRef){
    const xhr = new XMLHttpRequest();
    //https://www.purgomalum.com/
    xhr.onerror = (e) => console.log("error");

    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`headers = ${headers}`);
        console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    };

    xhr.open("GET", url);

    xhr.send();
}
function locationLoaded(jsonString){
    locations = JSON.parse(jsonString);
    console.log(locations);

    
}

//ajax.downloadFile(url,poiLoaded);

export {downloadFile};