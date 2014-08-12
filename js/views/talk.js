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
        'click .star-button': 'toggleStar',
        'click .talk': 'toggleDescription'
    },
    toggleStar : function() {
        if (dom.hasClass(this.el, 'starred')) {
            dom.removeClass(this.el, 'starred');
            dom.html(this.get('span.star-button'), 'star');
            this.model.starred = false;
        } else {
            dom.addClass(this.el, 'starred');
            dom.html(this.get('span.star-button'), 'unstar');
            this.model.starred = true;
        }
    },
    toggleDescription : function(event) {
        if (dom.hasClass(event.target.parentNode, 'description') || dom.hasClass(event.target, 'star-button')) {
            return;
        }

        var element = this.get('div.description');
        dom.hasClass(element, 'hidden') ? dom.removeClass(element, 'hidden') : dom.addClass(element, 'hidden');
    },
    render: function() {
        this.renderWithTemplate(this);

        if (this.model.starred) {
            dom.addClass(this.el, 'starred');
        }
    }
});
