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

PageBuilder.prototype.renderSchedule = function(conference_schedule) {
	var list = "";
	for (var date in conference_schedule) {
		list += '<li data-day="' + date + '"" class="schedule-tab">' + date + '</li>';
	}
	list += '<li class="refresh-tab"><span class="refresh-icon"></span></li>';

	document.getElementById('schedule-tabs').setAttribute('class', 'tabs-' + Object.keys(conference_schedule).length);
	document.getElementById('schedule-tabs').innerHTML = list;

	var schedule_container = "";
	for (date in conference_schedule) {
		var day_string = '<div id="' +  date + '" class="day-schedule">';

		var schedule = conference_schedule[date];

		var schedule_length = schedule.length;
		for (var i = 0; i < schedule_length; i++) {
			var slot = schedule[i];
			day_string += '<h2>' + slot.time.start + ' - ' + slot.time.end + '</h2>';

			var talk_length = slot.talks.length;
			for (var j = 0; j < talk_length; j++) {
				var talk = slot.talks[j];
				var talk_id = date + '-' + i + '-' + j;

				if (!talk.description) {
					talk.description = 'No description available.';
				}

				day_string += '<div class="talk" data-talk-id="' + talk_id + '">';
				day_string += '<h3 class="talk-headline">' + talk.speaker + ' - ' +  talk.topic + '</h3>';
				day_string += '<div>Location: ' + talk.location + '</div>';
				day_string += '<div id="' + talk_id + '" class="description hidden">' +talk.description + '</div>';
				day_string += '</div>';
			}
		}

		day_string += '</div>';

		schedule_container += day_string;
	}

	document.getElementById('schedule').innerHTML = schedule_container;

	this.emitter.trigger('schedule-rendered');
}

PageBuilder.prototype.registerEvents = function() {
	var self = this;
	this.emitter.bind('schedule-data-ready', function(schedule_data) {
		self.renderSchedule(schedule_data);
	});

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
