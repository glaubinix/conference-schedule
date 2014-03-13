function CurrentDay(emitter) {
	this.emitter = emitter;
}

CurrentDay.prototype.registerPlugin = function() {
	var self = this;
	this.emitter.bind('schedule-rendered', function() {
		var now = new Date;
		var month = now.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		var day = now.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		var today = now.getFullYear() + '-' + month + '-' + now.getDate();

		if (document.getElementById(today)) {
			self.emitter.trigger('select-day', today);
		}
	});
};
