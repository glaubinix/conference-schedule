/*global me, app*/
var Router = require('ampersand-router');
var SchedulePage = require('./pages/schedule');


module.exports = Router.extend({
    routes: {
        '': 'defaultView',
        ':selector/:id': 'selectionView',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    defaultView: function () {
        app.menu.selector = 'day';
        app.menu.selectionValue = '2013-09-21';
        this.trigger('page', new SchedulePage({
            model: app.menu,
            collection: app.getTalks('day', '2013-09-21')
        }));
    },

    selectionView: function (selector, id) {
        app.menu.selector = selector;
        app.menu.selectionValue = id;
        this.trigger('page', new SchedulePage({
            model: app.menu,
            collection: app.getTalks(selector, id)
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
