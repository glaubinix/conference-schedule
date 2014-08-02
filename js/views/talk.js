var View = require('ampersand-view');
var templates = require('../templates');
var dom = require('ampersand-dom');

module.exports = View.extend({
    template: templates.schedule.talk,
    bindings: {
        'model.topic': '[role=topic]',
        'model.location': '[role=location]',
        'model.speaker': '[role=speaker]',
        'model.description': '[role=description]'
    },
    events: {
        'click .talk': 'toggleDescription'
    },
    toggleDescription : function() {
        var element = this.get('div.description');
        dom.hasClass(element, 'hidden') ? dom.removeClass(element, 'hidden') : dom.addClass(element, 'hidden');
    }
});
