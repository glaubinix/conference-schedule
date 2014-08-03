var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    template: templates.schedule.menuentry,
    bindings: {
        'model.entry': '[role=entry]'
    }
});
