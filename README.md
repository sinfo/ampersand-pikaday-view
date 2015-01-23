# ampersand-pikaday-view

An Ampersand view module for user date input, using [pikaday.js](https://github.com/dbushell/Pikaday/) and based on [ampersand-date-view](https://github.com/mikehedman/ampersand-date-view).

## install
```
npm install ampersand-pikaday-view
```

## example

```javascript
var FormView = require('ampersand-form-view');
var DateView = require('ampersand-date-view');

module.exports = FormView.extend({
    fields: function () {
        return [
            new DateView({
              label: 'Birth date',
              value: this.model.birthDate || '',
              name: 'birthDate',
            }),
            ...
        ];
    }
});

```

#### opts

- minDate
- maxDate

And all the standard options from ampersand-input-view


## credits

Thanks to [@mikehedman](https://github.com/mikehedman) for `ampersand-date-view` and [@dbushell](https://github.com/dbushell) for `pikaday.js`.


## license

MIT

