var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    type: 'conference',
    props: {
        name: ['string'],
        theme: ['string', true, ''],
        plugins: ['array']
    }
});
