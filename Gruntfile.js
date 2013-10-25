module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			src: [
				"js/libs/microevent.js",
				"js/plugin_factory.js",
				"js/eventemitter.js",
				"js/view-helper.js",
				"js/theme-loader.js",
				"js/schedule-loader.js",
				"js/spreadsheet-parser.js",
				"js/request.js",
				"js/page-builder.js",
				"js/plugins/current-day.js",
				"js/plugins/star.js",
				"js/plugins/refresh.js",
				"js/plugins/local-storage.js"
			],
			options: {
				specs: "spec/**/*.js"
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-jasmine')

	grunt.registerTask('test', ['jasmine'])
	grunt.registerTask('default', ['test'])
};
