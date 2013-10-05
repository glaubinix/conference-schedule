function PluginFactory(emitter, view_helper) {
	this.emitter = emitter;
	this.view_helper = view_helper;
}

PluginFactory.prototype.getPlugin = function(plugin_name) {
	switch (plugin_name) {
		case 'current-day':
			return new CurrentDay(this.emitter);
		case 'star':
			return new Star(this.emitter, this.view_helper);
		case 'refresh':
			return new Refresh(this.emitter, this.view_helper);
		default:
			throw new Error('Plugin does not exist with name: ' + plugin_name);
	}
};
