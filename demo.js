/*global console, window*/
// can be run with `npm run demo`
var DateView = require('./ampersand-pikaday-view');
var FormView = require('ampersand-form-view');
var pikadayCSS = require('./pikaday.css');

var input = new DateView({
    label: 'Birth date',
    name: 'birthDate',
    required: true,
    value: new Date('Mon Jan 1 1994 00:00:00 GMT+0100 (GMT)'),
    maxDate: new Date('Mon Jan 1 2000 00:00:00 GMT+0100 (GMT)'),
});

var form = document.createElement('form');
form.innerHTML = '<div data-hook="field-container"></div><input type="submit">';

var formView = new FormView({
    el: form,
    fields: [input],
    submitCallback: function (vals) {
        console.log(vals);
    }
});

window.formView = formView;

document.body.appendChild(formView.el);
