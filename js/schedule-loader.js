function ScheduleLoaderFactory() {

}

ScheduleLoaderFactory.prototype.getScheduleLoader = function(config) {
	switch (config.schedule_loader.type) {
		case 'json':
			return new JsonScheduleLoader(config.schedule_loader.url);
		case 'spreadsheet':
			return new SpreadsheetScheduleLoader(config.schedule_loader.key);
		default:
			throw new Error('Requested an undefined schedule loader: ' + config.schedule_loader.type);
	}
};

function ScheduleLoader() {
	this.url = '';
}

ScheduleLoader.prototype.load = function(callback) {
	var request = new Request(this.url);
	request.load(callback);
};

function JsonScheduleLoader(file_name) {
	this.url = file_name;
}

JsonScheduleLoader.prototype = new ScheduleLoader();
JsonScheduleLoader.prototype.constructor = JsonScheduleLoader;

function SpreadsheetScheduleLoader(key) {
	this.url = "https://docs.google.com/spreadsheet/pub?key=" + key + "&single=true&gid=1&output=csv";
}

SpreadsheetScheduleLoader.prototype = new ScheduleLoader();
SpreadsheetScheduleLoader.prototype.constructor = SpreadsheetScheduleLoader;
