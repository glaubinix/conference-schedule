(function() {
	"use strict";

	var loader = new SpreadsheetLoader();
	loader.load('0AoIOxKkr6fGqdGtHdWJqZFBJUnF1bEt3RVBsQUxINVE', function(data) {
		var schedule = {};
		schedule.conference = 'jsconf.eu';
		schedule.schedule = {};

		var day;
		var day_identifier;
		var slot;

		var locations = [
			data[0][3],
			data[0][10]
		];

		for (var i in data) {
			var row_data = data[i];

			if (row_data[0].indexOf('Day') !== -1) {
				if (typeof day !== 'undefined') {
					schedule.schedule[day_identifier] = day;
				}

				day_identifier = row_data[0].replace(/([\r\n])/, "").replace(/(\s)/, "");
				day = [];
			}

			// maybe we have a new time slot
			var matches = row_data[0].match(/([0-9]+).([0-9]+)/);
			if (null != matches) {
				if (isNaN(row_data[1]) || row_data[1].length == 0) {
					var end_string = 'Open End';
				} else {
					var end = matches[1] * 60 + parseInt(matches[2]) + parseInt(row_data[1]);
					var end_string = Math.floor(end / 60).toString() + ':' + ((end % 60).toString() == 0 ? '00' : (end % 60).toString());
				}

				slot = {
					time: {
						start: matches[1] + ':' + matches[2],
						end: end_string
					},
					talks: []
				};

				if (row_data[5] == '') {
					slot.talks.push({
						speaker: 'all',
						topic:  row_data[4],
						location: locations[0]
					});
				} else {
					slot.talks.push({
						speaker: row_data[4],
						topic:  row_data[5],
						location: locations[0]
					});
				}

				// There are two talks
				if (row_data[0] === row_data[7] && row_data[7] !== '' && row_data[12] !== '') {
					slot.talks.push({
						speaker: row_data[11],
						topic:  row_data[12],
						location: locations[1]
					});
				}
			}

			if (typeof slot != 'undefined') {
				day.push(slot);
			}

			slot = undefined;

		}

		initSchedule(JSON.stringify(schedule));
	});

	var initSchedule = function(response) {
		if (window.localStorage) {
			localStorage.setItem('schedule', response);
		}

		var data = JSON.parse(response);
		document.getElementsByTagName('title')[0].innerText = data.conference;
		document.getElementById('headline').innerHTML = data.conference;

		var list = "";
		for (var date in data.schedule) {
			list += '<li data-day="' + date + '"" class="schedule-tab">' + date + '</li>';
		}

		document.getElementById('schedule-tabs').setAttribute('class', 'tabs-' + Object.keys(data.schedule).length);
		document.getElementById('schedule-tabs').innerHTML = list;

		var schedule_container = "";
		for (date in data.schedule) {
			var day_string = '<div id="' +  date + '" class="day-schedule">';

			var schedule = data.schedule[date];

			var schedule_length = schedule.length;
			for (var i = 0; i < schedule_length; i++) {
				var slot = schedule[i];
				day_string += '<h2>' + slot.time.start + ' - ' + slot.time.end + '</h2>';

				var talk_length = slot.talks.length;
				for (var j = 0; j < talk_length; j++) {
					var talk = slot.talks[j];
					var talk_id = date + '-' + i + '-' + j;
					day_string += '<div class="talk">';
					day_string += '<h3 class="talk-headline" data-talk-id="' + talk_id + '">' + talk.speaker + ' - ' +  talk.topic + '</h3>';
					day_string += '<div>Location: ' + talk.location + '</div>';
					day_string += '<div id="' + talk_id + '" class="description">' +talk.description + '</div>';
					day_string += '</div>';
				}
			}

			day_string += '</div>';

			schedule_container += day_string;
		}

		document.getElementById('schedule').innerHTML = schedule_container;

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
			selectTab(today);
		} else {
			var first_tab = document.querySelector('.schedule-tab');
			if (first_tab) {
				selectTab(first_tab.getAttribute('data-day'));
			}
		}

		applyForSelector('description', function(element) {
			addClass(element, 'hidden')
		});

		applyForSelector('schedule-tab', function(element) {
			element.addEventListener('click', function(event) {
				var day = event.target.getAttribute('data-day');
				selectTab(day);
			});
		});

		applyForSelector('talk-headline', function(element) {
			element.addEventListener('click', function(event) {
				var talk_id = event.target.getAttribute('data-talk-id');
				toggleClass(document.getElementById(talk_id), 'hidden');
			});
		});
	};

	var selectTab = function (day) {
		applyForSelector('day-schedule', function(element) { addClass(element, 'hidden') });
		applyForSelector('schedule-tab', function(element) { removeClass(element, 'active-tab') });
		removeClass(document.getElementById(day), 'hidden');
		addClass(document.querySelector('[data-day="' + day + '"]'), 'active-tab');
	};

	var applyForSelector = function(class_selector, callback) {
		var description_list = document.getElementsByClassName(class_selector);
		var description_length = description_list.length;
		for (var k = 0; k < description_length; k++) {
			callback(description_list[k]);
		}
	};

	var addClass = function(element, css_class) {
		var current_css_class = element.getAttribute('class').split(' ');
		if (current_css_class.indexOf(css_class) === -1) {
			current_css_class.push(css_class);
		}

		element.setAttribute('class', current_css_class.join(' '));
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
		var current_css_class = element.getAttribute('class').split(' ');
		if (current_css_class.indexOf(css_class) === -1) {
			addClass(element, css_class);
		} else {
			removeClass(element, css_class);
		}
	};

	if (window.localStorage) {
		var schedule = localStorage.getItem('schedule');
		if (schedule) {
			initSchedule(schedule);
		}
	}

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			initSchedule(request.responseText);
		}
	};
	request.open("GET", 'data/schedule.json', true);
	request.send();

})();
