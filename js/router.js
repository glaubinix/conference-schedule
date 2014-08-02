/*global me, app*/
var Router = require('ampersand-router');
var SchedulePage = require('./pages/schedule');


module.exports = Router.extend({
    routes: {
        '': 'defaultView',
        'day/:id': 'dayView',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    defaultView: function () {
        this.trigger('page', new SchedulePage({
            collection: app.getTalks('day', '2013-09-22')
        }));
    },

    dayView: function (id) {
        this.trigger('page', new PersonViewPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
