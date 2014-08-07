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
            currentLookup = {},
            newCounter = 0,
            entries = [],
            self = this;

        this.menuEntries.forEach(function(entry) {
            currentLookup[entry.entry] = entry;
        });

        this.talks.forEach(function(talk) {
            if (typeof talk[self.selector] !== 'undefined'
                && !entryIdentifier.hasOwnProperty(talk[self.selector])) {

                entryIdentifier[talk[self.selector]] = true;
                entries.push({entry: talk[self.selector], selector: self.selector});

                if (typeof currentLookup[talk[self.selector]] === 'undefined') {
                    newCounter++;
                }
            }
        });

        if (newCounter > 0) {
            this.menuEntries.reset(entries);
        }
    }
});
