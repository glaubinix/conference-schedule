function Request(url) {
	this.url = url;
}

Request.prototype.load = function(callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			callback(request.responseText);
		}
	};

	request.open("GET", this.url, true);
	request.send();
};
