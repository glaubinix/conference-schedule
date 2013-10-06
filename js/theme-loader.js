function ThemeLoader() {

}

ThemeLoader.prototype.loadTheme = function(theme) {
	if (theme === 'hot-pink') {
		return;
	}

	this.fetchTheme(theme);
};

ThemeLoader.prototype.fetchTheme = function(theme) {
	var file = document.createElement("link");
	file.setAttribute("rel", "stylesheet");
	file.setAttribute("type", "text/css");
	file.setAttribute("href", 'css/themes/' + theme + '.css');

	if (typeof file !== "undefined") {
		document.getElementsByTagName("head")[0].appendChild(file)
	}
};
