var Collection = require('ampersand-collection');
var sync = require('ampersand-sync');
var extend = require('extend-object');

// Wrap an optional error callback with a fallback error event.
var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
    };
};

var mixin = {
    setCustomParser: function(customParser) {
      this.customParser = customParser;
    },
    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
        options = options ? extend({}, options) : {};
        if (options.parse === void 0) options.parse = true;
        var success = options.success;
        var collection = this;
        options.success = function(resp) {
            if (collection.customParser) resp = collection.customParser(resp);
            var method = options.reset ? 'reset' : 'set';
            collection[method](resp, options);
            if (success) success(collection, resp, options);
            collection.trigger('sync', collection, resp, options);
        };
        wrapError(this, options);
        return this.sync('read', this, options);
    },
    sync: function() {
        return sync.apply(this, arguments);
    }
};

module.exports = Collection.extend(mixin);
