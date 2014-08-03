/*global app, me, $*/
var Router = require('./router');
var MainView = require('./views/main');
var SubCollection = require('ampersand-subcollection');
var domReady = require('domready');
var Conference = require('./models/conference');
var parser = require('./helpers/parser/default');
var Talks = require('./models/talks');
var Menu = require('./models/menu');
var config = require('../config.json');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        window.conference = new Conference(config);
        this.talks = new Talks();
        this.talks.setCustomParser(parser);
        this.talks.fetch({reset: true});

        this.menu = new Menu({'selector': 'day', talks: this.talks});
        this.talks.on('all', function () {
           self.menu.rebuildMenu(self.talks);
        });

        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                conference: window.conference,
                el: document.body
            });

            // ...and render it
            mainView.render();

            // listen for new pages from the router
            self.router.on('newPage', mainView.setPage, mainView);

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    },

    getTalks: function (selector, value) {
        return new SubCollection(this.talks, {
            filter: function(model) {
                return model.get(selector) == value;
            }
        })
    }
};

// run it
module.exports.blastoff();
