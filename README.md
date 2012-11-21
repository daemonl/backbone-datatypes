Backbone Datatypes
==========

Custom data types for JavaScript and methods to integrate those types into Backbone.js models

WORK IN PROGRESS!

datetime.js
-----------
Allows formatting dates according to the rules in PHP's Date formatting. (new DateTime.format("d M y h:ia")).

An vague attempt at allowing JavaScript dates to work independently of timezones by storing the datetime object in GMT and converting at the time of formatting.
The theory is that the timezone doesn't matter until you are formatting.

The default timestamp is number of SECONDS, but a getJsTs and setJsTs work in miliseconds.

datetime is stableish - I am using it in my own projects. 

Timezone doesn't deal at all with daylight savings yet.

Relies on the juration plugin to format dates in human form. [https://github.com/domchristie/juration]

duration.js
-----------
A small wrapper for juration, construct from the number of seconds.

currency.js
-----------
Will be for currency. Maybe will do currency conversions - we shall see. For now it handles formatting numbers in a few currencies.

_convert.js
-----------
Decorates backbone.js models parse and toJSON to make replace low level datatypes with these classes, and back again.

    _convert.decorate(model, {start: 'dateTime', duration: 'duration', cost: 'currency', name: 'string'} );

the toJSON function will only return attributes in the fields specified which also exist in the model's attributes.



