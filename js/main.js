(function() {
	"use strict";

	var emitter = new EventEmitter();
	var view_helper = new ViewHelper();
	var page_builder = new PageBuilder(emitter, view_helper);
	page_builder.registerEvents();

	var request = new Request('config.json');
	request.load(function(raw_config) {
		var config = JSON.parse(raw_config);

		var plugin_factory = new PluginFactory(emitter, view_helper)
		for (var i in config.plugins) {
			var plugin = plugin_factory.getPlugin(config.plugins[i]);
			plugin.registerPlugin();
		}

		page_builder.setConferenceTitle(config.conference);
		if (false && window.localStorage) {
			var schedule = localStorage.getItem('schedule');
			if (schedule) {
				//page_builder.renderSchedule(schedule);
			}
		}

		var schedule_loader_factory = new ScheduleLoaderFactory();
		var loader = schedule_loader_factory.getScheduleLoader(config);

		if (config.schedule_loader.type == 'spreadsheet') {
			var parser = new JsconfLikeSpreadsheetParser();
			loader.load(function(result1) {
				parser.convertCsvToJson(result1, function(result) {
					parser.buildSchedule(result, function(result) {
						emitter.trigger('schedule-data-ready', result);
					});
				});
			});
		} else {
			loader.load(function(result) {
				emitter.trigger('schedule-data-ready', result);
			});
		}
	});

})();
