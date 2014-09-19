var Collection = require('../helpers/ampersand-collection-storage-parser');
var Talk = require('./talk');
var config = require('../../config');

module.exports = Collection.extend({
    model: Talk,
    url: config.schedule_loader.url,
    comparator: 'comparator'
});
