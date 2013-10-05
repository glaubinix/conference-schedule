function Star(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

// @todo the main.js still contains some parts of the start plugin (div + span)
Star.prototype.registerPlugin = function() {
	var self = this;
	this.emitter.bind('schedule-rendered', function() {
		self.view_helper.applyForSelector('star-button', function(element) {
			var talk_element = element.parentNode.parentNode.parentNode;

			element.innerText = (self.view_helper.hasClass(talk_element, 'starred') ? 'unstar' : 'star');

			element.addEventListener('click', function(event) {
				event.stopPropagation();
				self.view_helper.toggleClass(talk_element, 'starred');
				element.innerText = (self.view_helper.hasClass(talk_element, 'starred') ? 'unstar' : 'star');
			});
		});
	});
}
