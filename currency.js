var Currency = function (obj) {
  'use strict';

  var EnumCurrencySymbols;

  EnumCurrencySymbols = {
    "AUD": "&#36; ",
    "CAD": "&#36; ",
    "EUR": "&euro; ",
    "GBP": "&#8356; ",
    "HKD": "&#36; ",
    "NZD": "&#36; ",
    "SGD": "&#36; ",
    "USD": "&#36; "
  };

  if (obj === undefined) {
    obj = {};
  }



  if (obj.value === undefined) {
    this.value = '10';
  } else {
    this.value = obj.value;
  }

  if (obj.currency === undefined) {
    this.currency = window.hk_glob.preferences.currency;
  } else {
    this.currency = obj.currency;
  }

  this.format = function () {
    var s = "";
    if (EnumCurrencySymbols[obj.currency]) {
      s = EnumCurrencySymbols[obj.currency];
    }
    return s + " " + (+this.value).toFixed(2);
  };
};