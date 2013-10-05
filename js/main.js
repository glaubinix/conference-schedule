(function() {
	"use strict";

	var initSchedule = function(response, loaded_from_storage) {
		if (window.localStorage) {
			// it makes absolutely no sense to rebuild the page if nothing changed
			if (!loaded_from_storage && response == localStorage.getItem('schedule')) {
				return;
			}

			localStorage.setItem('schedule', response);
		}

		var conference_schedule = JSON.parse(response);

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
					day_string += '<div id="' + talk_id + '" class="description">' +talk.description + '<div><span class="star-button"></span></div></div>';
					day_string += '</div>';
				}
			}

			day_string += '</div>';

			schedule_container += day_string;
		}

		document.getElementById('schedule').innerHTML = schedule_container;

		emitter.trigger('schedule-rendered');

		applyForSelector('description', function(element) {
			addClass(element, 'hidden');
		});

		applyForSelector('schedule-tab', function(element) {
			element.addEventListener('click', function(event) {
				var day = event.target.getAttribute('data-day');
				emitter.trigger('select-day', day);
			});
		});

		applyForSelector('talk', function(element) {
			element.addEventListener('click', function() {
				var talk_id = element.getAttribute('data-talk-id');
				toggleClass(document.getElementById(talk_id), 'hidden');
			});
		});
	};

	var applyForSelector = function(class_selector, callback) {
		var description_list = document.getElementsByClassName(class_selector);
		var description_length = description_list.length;
		for (var k = 0; k < description_length; k++) {
			callback(description_list[k]);
		}
	};

    var hasClass = function(element, css_class) {
        return (element.getAttribute('class').split(' ').indexOf(css_class) != -1);
    };

	var addClass = function(element, css_class) {
        if (!hasClass(element, css_class)) {
            element.setAttribute('class', element.getAttribute('class') + ' ' + css_class);
        }
	};

	var removeClass = function(element, css_class) {
		var current_css_class = element.getAttribute('class').split(' ');
		var index = current_css_class.indexOf(css_class);
		if (index !== -1) {
			current_css_class.splice(index, 1);
		}

		element.setAttribute('class', current_css_class.join(' '));
	};

	var toggleClass = function(element, css_class) {
        if (hasClass(element, css_class)) {
            removeClass(element, css_class);
        } else {
            addClass(element, css_class);
        }
	};

	var emitter = new EventEmitter();
	var view_helper = new ViewHelper();
	var page_builder = new PageBuilder(emitter, view_helper);

	var request = new Request('config.json');
	request.load(function(raw_config) {
		var config = JSON.parse(raw_config);

		var plugin_factory = new PluginFactory(emitter, view_helper)
		for (var i in config.plugins) {
			var plugin = plugin_factory.getPlugin(config.plugins[i]);
			plugin.registerPlugin();
		}

		page_builder.setConferenceTitle(config.conference);
		if (window.localStorage) {
			var schedule = localStorage.getItem('schedule');
			if (schedule) {
				initSchedule(schedule, true);
			}
		}

		var schedule_loader_factory = new ScheduleLoaderFactory();
		var loader = schedule_loader_factory.getScheduleLoader(config);

		if (config.schedule_loader.type == 'spreadsheet') {
			var parser = new JsconfLikeSpreadsheetParser();
			loader.load(function(result1) {
				parser.convertCsvToJson(result1, function(result) {
					parser.buildSchedule(result, initSchedule);
				});
			});
		} else {
			loader.load(initSchedule);
		}
	});

})();
