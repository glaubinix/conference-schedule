function Refresh(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

Refresh.prototype.registerPlugin = function() {
	var self = this;
	this.emitter.bind('schedule-rendered', function() {
		document.getElementById('schedule-tabs').innerHTML += '<li class="refresh-tab"><span class="refresh-icon"></span></li>';

		self.view_helper.applyForSelector('refresh-tab', function(element) {
			element.addEventListener('click', function(event) {
				self.view_helper.addClass(element, 'refreshing');

				// I know, this is really dirty, but we need to refactor it anyway :) -> oh yes
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState === 4 && request.status === 200) {
						//initSchedule(request.responseText); // disabled for now
					}
				};

				request.open("GET", 'data/schedule.json', true);
				request.send();
			});
		});
	});
};
