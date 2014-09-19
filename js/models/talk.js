var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    type: 'conference',
    props: {
        speaker: ['string'],
        topic: ['string'],
        location: ['string'],
        description: ['string'],
        day: ['string'],
        starred: ['boolean']
    },
    derived: {
        datetime: {
            fn: function() {
                return this.time.start + ' - ' + this.time.end;
            }
        },
        talkId: {
            fn: function() {
                return 'talk-' + this.id;
            }
        }
    },
    extraProperties: 'allow'
});
