describe("PluginFactory", function() {
	var plugin_factory;
	var emitter;

	beforeEach(function() {
		var view_helper = jasmine.createSpy('ViewHelper');
		emitter = jasmine.createSpy('Emitter');
		plugin_factory = new PluginFactory(emitter, view_helper); 
	});

	it("throws an error when plugin unknown", function() {
		var get_unknown_plugin = function() {
			plugin_factory.getPlugin('urglburgl');
		}
		var expected_error = new Error('Plugin does not exist with name: urglburgl');
		expect(get_unknown_plugin).toThrow(expected_error);
	});

	it("creates a CurrentDay plugin", function() {
		var actual = plugin_factory.getPlugin('current-day');
		expect(actual).toEqual(new CurrentDay(emitter));
	});
});

