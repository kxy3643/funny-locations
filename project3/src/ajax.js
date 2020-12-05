function downloadFile(url, callbackRef){
    const xhr = new XMLHttpRequest();
    //https://www.purgomalum.com/
    xhr.onerror = (e) => console.log("error");

    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        callbackRef(jsonString);
    };

    xhr.open("GET", url);

    xhr.send();
}

export {downloadFile};