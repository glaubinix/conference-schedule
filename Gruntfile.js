var config = require('./config.json')

module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssc: {
			build: {
				options: {
					consolidateViaDeclarations: true,
					consolidateViaSelectors:    true,
					consolidateMediaQueries:    true
				},
				files: {
					'build/css/master.css': ['css/normalize.css', 'css/main.css', 'css/themes/' + config['theme'] + '.css']
				}
			}
		},
		cssmin: {
			build: {
				src: 'build/css/master.css',
				dest: 'build/css/master.css'
			}
		},
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
	});

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.registerTask('buildcss',  ['cssc', 'cssmin']);
	grunt.registerTask('test', ['jasmine'])
	grunt.registerTask('default', ['test'])
};
