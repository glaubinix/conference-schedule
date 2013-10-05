function PageBuilder(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;

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

PageBuilder.prototype.registerEvents = function() {
	var self = this;
	this.emitter.bind('schedule-rendered', function() {
		self.view_helper.applyForSelector('talk', function(element) {
			element.addEventListener('click', function() {
				var talk_id = element.getAttribute('data-talk-id');
				self.view_helper.toggleClass(document.getElementById(talk_id), 'hidden');
			});
		});

		self.view_helper.applyForSelector('schedule-tab', function(element) {
			element.addEventListener('click', function(event) {
				var day = event.target.getAttribute('data-day');
				self.emitter.trigger('select-day', day);
			});
		});
	});
}

MicroEvent.mixin(PageBuilder);
