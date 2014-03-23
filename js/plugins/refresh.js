function Refresh(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

Refresh.prototype.registerPlugin = function() {
	var self = this;
	this.emitter.bind('schedule-rendered', function() {
		var element = document.createElement('li');
		element.setAttribute('class', 'refresh-tab');
		element.innerHTML = '<span class="refresh-icon"></span>';
		document.getElementById('schedule-tabs').appendChild(element);

		self.view_helper.applyForSelector('refresh-tab', function(element) {
			element.addEventListener('click', function() {
				self.view_helper.addClass(element, 'refreshing');

				// I know, this is really dirty, but we need to refactor it anyway :) -> oh yes
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (request.readyState === 4 && request.status === 200) {
						self.emitter.trigger('schedule-data-ready', request.responseText);
					}
					self.view_helper.removeClass(element, 'refreshing');
				};

				request.open("GET", 'data/schedule.json', true);
				request.send();
			});
		});
	});
};
