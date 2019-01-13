

export function postDataToServer(url, data) {


    // Create our request constructor with all the parameters we need
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request)
        .catch(function (error) {
            console.log(error);
        })
}