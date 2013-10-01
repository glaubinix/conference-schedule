function ScheduleLoader() {
	this.url = '';
}

ScheduleLoader.prototype.load = function(callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			callback(request.responseText);
		}
	};

	request.open("GET", this.url, true);
	request.send();
};

function JsonScheduleLoader(file_name) {
	if (file_name.indexOf("http://") != -1 || file_name.indexOf("https://") != -1) {
		this.url = file_name;
	} else {
		this.url = 'data/' + file_name;
	}
}

JsonScheduleLoader.prototype = new ScheduleLoader();
JsonScheduleLoader.prototype.constructor = JsonScheduleLoader;

function SpreadsheetScheduleLoader(key) {
	this.url = "https://docs.google.com/spreadsheet/pub?key=" + key + "&single=true&gid=1&output=csv";
}

SpreadsheetScheduleLoader.prototype = new ScheduleLoader();
SpreadsheetScheduleLoader.prototype.constructor = SpreadsheetScheduleLoader;
