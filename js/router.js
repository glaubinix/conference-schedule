/*global me, app*/
var Router = require('ampersand-router');
var SchedulePage = require('./pages/schedule');


module.exports = Router.extend({
    routes: {
        '': 'defaultView',
        'day/:id': 'dayView',
        'location/:id': 'locationView',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    defaultView: function () {
        this.trigger('page', new SchedulePage({
            model: app.menu,
            collection: app.getTalks('day', '2013-09-22')
        }));
    },

    dayView: function (id) {
        app.menu.selector = 'day';
        this.trigger('page', new SchedulePage({
            model: app.menu,
            collection: app.getTalks('day', id)
        }));
    },

    locationView: function (id) {
        app.menu.selector = 'location';
        this.trigger('page', new SchedulePage({
            model: app.menu,
            collection: app.getTalks('location', id)
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
