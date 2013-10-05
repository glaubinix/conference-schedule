function PageBuilder(emitter) {
	this.emitter = emitter;
	this.view_helper = new ViewHelper();

	var self = this;
	this.emitter.bind('select-day', function(day) {
		self.selectDay(day);
	});
};

PageBuilder.prototype.setConferenceTitle = function(title) {
	document.getElementsByTagName('title')[0].innerText = title;
	document.getElementById('headline').innerHTML = title;
};

PageBuilder.prototype.selectDay = function(day) {
	var self = this;
	this.view_helper.applyForSelector('day-schedule', function(element) {
		self.view_helper.addClass(element, 'hidden');
	});

	this.view_helper.applyForSelector('schedule-tab', function(element) {
		self.view_helper.removeClass(element, 'active-tab');
	});

	this.view_helper.removeClass(document.getElementById(day), 'hidden');
	this.view_helper.addClass(document.querySelector('[data-day="' + day + '"]'), 'active-tab');
};

MicroEvent.mixin(PageBuilder);
