var AmpersandState = require('ampersand-state');
var Talks = require('./talks');
var MenuEntries = require('./menuentries');

module.exports = AmpersandState.extend({
    type: 'menu',
    props: {
        selector: 'string'
    },
    collections: {
        talks: Talks,
        menuEntries: MenuEntries
    },
    initialize: function () {
        this.menuEntries = new MenuEntries();
        this.rebuildMenu(this.talks);
    },
    rebuildMenu: function (talks) {
        this.talks = talks;

        var entryIdentifier = {},
            entries = [],
            self = this;

        this.talks.forEach(function(talk) {
            if (typeof talk[self.selector] !== 'undefined'
                && !entryIdentifier.hasOwnProperty(talk[self.selector])) {

                entryIdentifier[talk[self.selector]] = true;
                entries.push({entry: talk[self.selector]})
            }
        });

        this.menuEntries.reset(entries);
    }
});
