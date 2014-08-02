var templates = require('../templates');
var TalkView = require('../views/talk');
var View = require('ampersand-view');

module.exports = View.extend({
    template: templates.pages.schedule,

    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, TalkView, this.getByRole('talk-list'));
    }
});
