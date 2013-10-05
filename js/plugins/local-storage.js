function LocalStorage(emitter) {
	this.emitter = emitter;
}

LocalStorage.prototype.registerPlugin = function() {
	if (window.localStorage) {
		var schedule = localStorage.getItem('schedule')
		if (schedule) {
			this.emitter.trigger('schedule-data-ready', schedule);
		}

		this.emitter.bind('schedule-data-ready', function(conference_data) {
			var schedule = localStorage.getItem('schedule')
			localStorage.setItem('schedule', conference_data);
		});
	}
};
