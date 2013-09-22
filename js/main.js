$.getJSON( "data/schedule.json", function( data ) {
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
				day_string += '<h3 data-talk-id="' + talk_id + '">' + talk.speaker + ' - ' +  talk.topic + '</h3>';
				day_string += '<div>Location: ' + talk.location + '</div>';
				day_string += '<div id="' + talk_id + '" class="description">' +talk.description + '</div>';
			}
		}

		day_string += '</div>';

		schedule_container += day_string;
	}

	document.getElementById('schedule').innerHTML = schedule_container;

	selectTab(day);

	applyForSelector('description', function(element) { addClass(element, 'hidden') });


	$('.schedule-tab').on('click', function (event) {
		var selected_day = $(this).data('day');
		selectTab(selected_day);
	});

	$('h3').on('click', function(event) {
		applyForSelector('description', function(element) { addClass(element, 'hidden') });
		var talk_id = $(this).data('talk-id');
		removeClass(document.getElementById(talk_id), 'hidden');
	});
});

var selectTab = function (day) {
	applyForSelector('day-schedule', function(element) { addClass(element, 'hidden') });
	removeClass(document.getElementById(day), 'hidden');
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
