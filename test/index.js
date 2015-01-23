var test = require('tape');
var DateView = require('../ampersand-pikaday-view');
if (!Function.prototype.bind) Function.prototype.bind = require('function-bind');

function isHidden(el) {
    return el.style.display === 'none';
}

test('basic initialization', function (t) {
    var control = new DateView({ name: 'title' });
    control.render();
    t.equal(control.el.tagName, 'DIV');
    t.equal(control.el.querySelectorAll('input').length, 1);
    t.equal(control.el.querySelector('input').getAttribute('name'), 'title');
    t.end();
});