function LocalStorage(emitter) {
	this.emitter = emitter;
}

LocalStorage.prototype.registerPlugin = function() {
	if (window.localStorage) {
		var schedule = localStorage.getItem('schedule')
		if (schedule) {
			this.emitter.trigger('schedule-data-ready', JSON.parse(schedule));
		}

		this.emitter.bind('schedule-data-ready', function(conference_data) {
			localStorage.setItem('schedule', JSON.stringify(conference_data));
		});
	}
};
