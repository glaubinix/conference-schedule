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
            dom.html(self.getByRole('menu-entries'), '');
            self.renderCollection(self.model.menuEntries, MenuEntry, self.getByRole('menu-entries'));
            dom.addClass(self.getByRole('menu-entries'), 'tabs-' + self.model.menuEntries.length);
            dom.addClass(self.get('#menu-' + self.model.selector + '-' + self.model.selectionValue), 'active-tab');
        });

        self.collection.on('sort', function() {
            var lastDateTime = {
                start: 0,
                end: 0
            },
                element;

            self.collection.each(function(entry) {
                element = document.getElementById(entry.talkId);
                if (element) {
                    element = element.getElementsByTagName('h2')[0];
                    if (entry.time.start === lastDateTime.start && entry.time.end === lastDateTime.end) {
                        dom.addClass(element, 'hidden');
                    } else {
                        dom.removeClass(element, 'hidden');
                    }

                    lastDateTime = entry.time;
                }
            });
        })
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

        var lastDateTime = {
                start: 0,
                end: 0
        },
            self = this,
            element;
        self.collection.each(function(entry) {
            element = self.get('#' + entry.talkId);
            if (element) {
                element = element.getElementsByTagName('h2')[0];
                if (entry.time.start === lastDateTime.start && entry.time.end === lastDateTime.end) {
                    dom.addClass(element, 'hidden');
                } else {
                    dom.removeClass(element, 'hidden');
                }

                lastDateTime = entry.time;
            }
        });
    }
});
