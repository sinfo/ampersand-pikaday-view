var View = require('ampersand-view');
var Pikaday = require('pikaday');
var isDate = require('amp-is-date');

module.exports = View.extend({
    template: [
        '<div class="form-group"><label data-hook="label"></label>',
            '<div class="date-controls">',
                '<input data-hook="datepicker" placeholder="YYYY-MM-DD"></input>',
            '</div>',
            '<div data-hook="message-container">',
                '<div data-hook="message-text" class="alert alert-danger"></div>',
            '</div>',
        '</div>'
    ].join(''),

    bindings: {
        'name': {
            hook: 'datepicker',
            type: 'attribute',
            name: 'name'
        },
        'label': [
            {
                hook: 'label'
            },
            {
                type: 'toggle',
                hook: 'label'
            }
        ],
        'message': {
            type: 'text',
            hook: 'message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'message-container'
        },
        'validityClass': {
            type: 'class',
            selector: 'input, textarea'
        },
        'rootElementClass': {
            type: 'class',
            selector: ''
        }
    },

    initialize: function (spec) {
        spec || (spec = {});
        this.tests = this.tests || spec.tests || [];
        this.startingValue = spec.value;
        this.value = spec.value;
        this.on('change:valid change:value', this.update, this);
        if (spec.template) this.template = spec.template;

        // will probably want this more selective, but for now, always validate
        this.shouldValidate = true;
    },

    render: function () {
        var self = this;

        //call the parent first
        View.prototype.render.apply(this);
        this.input = this.query('input');

        this.picker = new Pikaday({
            field: self.input,
            onSelect: function(date) {
                self.handleInputChanged(date);
            },
            onClose: function(date) {
                self.handleInputChanged(date);
            },
            defaultDate: self.value,
            setDefaultDate: true,
            minDate: self.minDate,
            maxDate: self.maxDate,
        });

        this.handleInputChanged = this.handleInputChanged.bind(this);
    },

    props: {
        value: 'any',
        startingValue: 'any',
        name: 'string',
        maxDate: ['date'],
        minDate: ['date'],
        label: ['string', true, ''],
        required: ['boolean', true, true],
        shouldValidate: ['boolean', true, true],
        validClass: ['string', true, 'input-valid'],
        invalidClass: ['string', true, 'input-invalid'],
        rootElementClass: ['string', true, ''],
        date: 'date'
    },

    derived: {
        valid: {
            deps: ['value'],
            fn: function () {
                //first time through, we won't have the subviews yet
                if(this.required && !(this.value && this.value != null)) {
                    this.message = 'Date must be set.';
                    return false;
                }
                this.message = '';
                return true;
            }
        },
        dateValid: {
            deps: ['value'],
            fn: function() {
                return isDate(this.value);
            }
        },
        showMessage: {
            deps: ['message', 'shouldValidate'],
            fn: function () {
                return this.shouldValidate && this.message;
            }
        },
        changed: {
            deps: ['value', 'startingValue'],
            fn: function () {
                return this.value !== this.startingValue;
            }
        },
        validityClass: {
            deps: ['valid', 'validClass', 'invalidClass', 'shouldValidate'],
            fn: function () {
                if (!this.shouldValidate) {
                    return '';
                } else {
                    return this.valid ? this.validClass : this.invalidClass;
                }
            }
        }
    },

    session: {
        message: 'string'
    },

    setValue: function (value, skipValidation) {
        //if we have a valid date, use it.  Otherwise, empty everything
        this.picker.defaultDate = value;
    },

    handleInputChanged: function (date) {
        this.value = this.picker.getDate();
    },

    clean: function () {
        return this.value;
    },

    beforeSubmit: function () {
        return;
    },

    reset: function () {
        this.setValue(this.startingValue);
    },

    clear: function () {
        this.setValue();
    },

    /**
     * forward updates from child controls
     */
    update: function () {
        if (this.parent) {
            this.parent.update(this);
        }
    }
});
