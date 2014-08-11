var templates = require('../templates');
var TalkView = require('../views/talk');
var MenuEntry = require('../views/menuentry');
var View = require('ampersand-view');
var dom = require('ampersand-dom');

module.exports = View.extend({
    template: templates.pages.schedule,
    initialize: function () {
        var self = this;
        this.model.menuEntries.once('all', function () {
            self.renderCollection(self.model.menuEntries, MenuEntry, self.getByRole('menu-entries'));
            dom.addClass(self.getByRole('menu-entries'), 'tabs-' + self.model.menuEntries.length);
            dom.addClass(self.get('#menu-' + self.model.selector + '-' + self.model.selectionValue), 'active-tab');
        });
    },
    render: function () {
        this.renderWithTemplate({menu: this.model});
        this.renderCollection(this.collection, TalkView, this.getByRole('talk-list'));
        this.renderCollection(this.model.menuEntries, MenuEntry, this.getByRole('menu-entries'));

        var length = this.model.menuEntries.length;
        if (length) {
            dom.addClass(this.getByRole('menu-entries'), 'tabs-' + length);
            dom.addClass(this.get('#menu-' + this.model.selector + '-' + this.model.selectionValue), 'active-tab');
        }
    }
});
