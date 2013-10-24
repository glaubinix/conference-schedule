describe("PluginFactory", function() {
	var plugin_factory;

	beforeEach(function() {
		var emitter = jasmine.createSpy('Emitter');
		var view_helper = jasmine.createSpy('ViewHelper');
		plugin_factory = new PluginFactory(emitter, view_helper); 
	});

	it("throws an error when plugin unknown", function() {
		var get_unknown_plugin = function() {
			plugin_factory.getPlugin('urglburgl');
		}
		var expected_error = new Error('Plugin does not exist with name: urglburgl');
		expect(get_unknown_plugin).toThrow(expected_error);
	});
});

