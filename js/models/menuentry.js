var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    type: 'menuentry',
    props: {
        entry: ['string'],
        selector: ['string']
    },
    derived: {
        identifier: {
            deps: ['entry', 'selector'],
            fn: function() {
                return 'menu-' + this.selector + '-' + this.entry;
            }
        },
        href: {
            deps: ['entry', 'selector'],
            fn: function() {
                return '/' + this.selector + '/' + this.entry;
            }
        }
    }
});
