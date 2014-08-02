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
            collection: app.talks
        }));
    },

    collectionDemo: function () {
        this.trigger('page', new CollectionDemo({
            model: me,
            collection: app.people
        }));
    },

    info: function () {
        this.trigger('page', new InfoPage({
            model: me
        }));
    },

    personAdd: function () {
        this.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        this.trigger('page', new PersonEditPage({
            id: id
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
