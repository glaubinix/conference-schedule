var Collection = require('../helpers/ampersand-collection-storage-parser');
var Talk = require('./talk');

module.exports = Collection.extend({
    model: Talk,
    url: '/data/schedule.json'
});
