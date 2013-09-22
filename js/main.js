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

var initSchedule = function(response) {
	if (window.localStorage) {
		localStorage.setItem('schedule', response);
	}

	var data = JSON.parse(response);
	document.getElementById('headline').innerHTML = data.conference;

	var list = "";
	for (var day in data.schedule) {
		list += '<li data-day="' + day + '"" class="schedule-tab">' + day + '</li>';
	}

	document.getElementById('schedule-tabs').setAttribute('class', 'tabs-' + Object.keys(data.schedule).length);
	document.getElementById('schedule-tabs').innerHTML = list;

	var schedule_container = "";
	for (var day in data.schedule) {
		var day_string = '<div id="' +  day + '" class="day-schedule">';

		var schedule = data.schedule[day];

		var schedule_length = schedule.length;
		for (var i = 0; i < schedule_length; i++) {
			var slot = schedule[i];
			day_string += '<h2>' + slot.time.start + ' - ' + slot.time.end + '</h2>';

			var talk_length = slot.talks.length;
			for (var j = 0; j < talk_length; j++) {
				var talk = slot.talks[j];
				var talk_id = day + '-' + i + '-' + j;
				day_string += '<h3 class="talk-headline" data-talk-id="' + talk_id + '">' + talk.speaker + ' - ' +  talk.topic + '</h3>';
				day_string += '<div>Location: ' + talk.location + '</div>';
				day_string += '<div id="' + talk_id + '" class="description">' +talk.description + '</div>';
			}
		}

		day_string += '</div>';

		schedule_container += day_string;
	}

	document.getElementById('schedule').innerHTML = schedule_container;

	selectTab(day);

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
}

var addClass = function(element, css_class) {
	var current_css_class = element.getAttribute('class').split(' ');
	if (current_css_class.indexOf(css_class) === -1) {
		current_css_class.push(css_class);
	}

	element.setAttribute('class', current_css_class.join(' '));
}


var removeClass = function(element, css_class) {
	var current_css_class = element.getAttribute('class').split(' ');
	var index = current_css_class.indexOf(css_class);
	if (index !== -1) {
		current_css_class.splice(index, 1);
	}

	element.setAttribute('class', current_css_class.join(' '));
}

var toggleClass = function(element, css_class) {
	var current_css_class = element.getAttribute('class').split(' ');
	if (current_css_class.indexOf(css_class) === -1) {
		addClass(element, css_class);
	} else {
		removeClass(element, css_class);
	}
}
