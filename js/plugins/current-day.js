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
		} else {
			//@todo this should not be part of this plugin, the page renderer should select the current day per default
			var first_tab = document.querySelector('.schedule-tab');
			if (first_tab) {
				self.emitter.trigger('select-day', first_tab.getAttribute('data-day'));
			}
		}
		self.emitter.trigger()
	});
};

MicroEvent.mixin(CurrentDay);
