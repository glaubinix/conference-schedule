// this should be the build script, maybe use gulp for this?

// init command:
	// should create init new repository and create a package.json
	// do we need to display a list of possible extensions?

// build task:
	// maybe abuse npm install?
	// should copy css, merge and minify
	// copy images if necessary
	// auto generate a main.js file which loads and initialises all the plugins
	// use browserify and uglifyjs to merge them into one


// this is how I think the generated js file should somehow look like
var plugin = require('plugin');
var Application = require('Application');

var app = new Application();
app.registerPlugin(plugin); // add plugin to stack and check if the plugin provides some functionality
app.bootstrap();
app.launch(); // this should resolve dic and mostly trigger an init event and parts of

// plugin structure
var Plugin = function() {

};

Plugin.prototype.inject();
Plugin.prototype.provide
