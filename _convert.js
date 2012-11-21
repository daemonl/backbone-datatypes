define(['underscore', 'TDateTime', 'TDuration'], function (_, TDateTime, TDuration) {
  'use strict';

  var initialize, decorate;

  initialize = function (model, fields) {
    _.each(fields, function (type, key) {
      switch (type) {
      case 'dateTime':
        model.attributes[key] = new TDateTime();
        break;
      case 'duration':
        model.attributes[key] = new TDuration();
        break;
      }
    });
  };

  decorate = function (model, fields) {

    model.prototype.parse = function (r, xhr) {

      _.each(fields, function (type, key) {
        switch (type) {
        case 'dateTime':
          r[key] = new TDateTime(r[key]);
          break;
        case 'duration':
          r[key] = new TDuration(r[key]);
          break;
        }
      });
      return r;
    };

    model.prototype.toJSON = function () {
      var r = {},
        attr = this.attributes;

        for(var k in fields)
        {
            if (fields.hasOwnProperty(k))
            {
              switch (fields[k]) {
                case 'dateTime':
                  r[k] = attr[k].getJSON();
                  break;
                case 'duration':
                  r[k] = attr[k].getSeconds();
                  break;
                default:
                  r[k] = attr[k];
              }
            }else{
              r[k] = attr[k];
            }
        }
      return r;
    };
  };

  return {
    decorate: decorate,
    initialize: initialize
  };
});