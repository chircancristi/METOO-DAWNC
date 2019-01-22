function savePosition(position) {
	var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000;
	now.setTime(time);

	document.cookie = 'status=open ; expires=' + now.toUTCString() + '; path=/';
	document.cookie = 'latitude=' + position.coords.latitude + '; expires=' + now.toUTCString() + '; path=/';
	document.cookie = 'longitude=' + position.coords.longitude + '; expires=' + now.toUTCString() + '; path=/';
}

function showError(error) {
	let now = new Date();
	let time = now.getTime();
	time += 3600 * 1000;
	now.setTime(time);
	switch (error.code) {
		case error.PERMISSION_DENIED:
			document.cookie = "status='denied'; expires=" + now.toUTCString() + '; path=/';
			break;
		case error.POSITION_UNAVAILABLE:
			throw new Error('Postion unavaible');
		case error.TIMEOUT:
			throw new Error('Timeout');
		case error.UNKNOWN_ERROR:
			throw new Error('Something went wrong');
	}
}
export function saveLocation() {
	navigator.geolocation.getCurrentPosition(savePosition, showError);
}
