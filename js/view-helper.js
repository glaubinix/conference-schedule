function ViewHelper() {

}

ViewHelper.prototype.hasClass = function(element, css_class) {
	return (element.getAttribute('class').split(' ').indexOf(css_class) != -1);
};

ViewHelper.prototype.addClass = function(element, css_class) {
	if (!this.hasClass(element, css_class)) {
		element.setAttribute('class', element.getAttribute('class') + ' ' + css_class);
	}
};

ViewHelper.prototype.removeClass = function(element, css_class) {
	var current_css_class = element.getAttribute('class').split(' ');
	var index = current_css_class.indexOf(css_class);
	if (index !== -1) {
		current_css_class.splice(index, 1);
	}

	element.setAttribute('class', current_css_class.join(' '));
};

ViewHelper.prototype.toggleClass = function(element, css_class) {
	if (this.hasClass(element, css_class)) {
		this.removeClass(element, css_class);
	} else {
		this.addClass(element, css_class);
	}
};

ViewHelper.prototype.applyForSelector = function(class_selector, callback) {
	var description_list = document.getElementsByClassName(class_selector);
	var description_length = description_list.length;
	for (var k = 0; k < description_length; k++) {
		callback(description_list[k]);
	}
};
