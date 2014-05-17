var plugins = [],
	emitter,
	viewHelper,
	config;

function Application(config) {

}

Application.prototype.registerPlugin = function (plugin) {
	plugins.push(plugin);
	if (plugin.inject) {
		plugin.inject(config, emitter, viewHelper);
	}

	// maybe use requireEmitter, requireViewHelper, requireConfig

	// add menu entry stuff
};

Application.prototype.bootstrap = function () {
	emitter.trigger('app-bootstraping');
	// setup schedule fetcher
	// setup design
	emitter.trigger('app-bootstraped');
};

Application.prototype.launch = function () {

};

module.export = Application;
