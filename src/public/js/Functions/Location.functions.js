
function savePosition(position) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    document.cookie = "status=open ; expires=" + now.toUTCString() + '; path=/';
    document.cookie = "latitude=" + position.coords.latitude + '; expires=' + now.toUTCString() + '; path=/';
    document.cookie = "longitude=" + position.coords.longitude + '; expires=' + now.toUTCString() + '; path=/';
}

function showError(error) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.cookie = "status='denied'; expires=" + now.toUTCString() + '; path=/';
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
export function saveLocation() {
    navigator.geolocation.getCurrentPosition(savePosition, showError);

}