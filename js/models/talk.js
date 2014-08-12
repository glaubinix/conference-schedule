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
    extraProperties: 'allow'
});
