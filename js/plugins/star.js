function Star(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

Star.prototype.registerPlugin = function() {
	var self = this;

	var starHash = window.localStorage ? JSON.parse(localStorage.getItem("plugin-star")) : {};
	if (!starHash) {
		starHash = {};
	}

	this.emitter.bind('schedule-rendered', function() {
		self.view_helper.applyForSelector('description', function(element) {
			element.innerHTML += '<div><span class="star-button"></span></div>';
		});

		self.view_helper.applyForSelector('star-button', function(element) {
			var talk_element = element.parentNode.parentNode.parentNode,
				talkId = talk_element.dataset['talkId'];

			if (starHash[talkId]) {
				self.view_helper.addClass(talk_element, 'starred');
			}

			element.innerText = (self.view_helper.hasClass(talk_element, 'starred') ? 'unstar' : 'star');

			element.addEventListener('click', function(event) {
				var active = self.view_helper.hasClass(talk_element, 'starred');
				starHash[talkId] = !active;
				localStorage.setItem("plugin-star", JSON.stringify(starHash));

				event.stopPropagation();
				self.view_helper.toggleClass(talk_element, 'starred');
				element.innerText = (active ? 'unstar' : 'star');
			});
		});
	});
};
