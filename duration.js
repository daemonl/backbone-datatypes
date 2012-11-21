define(['juration'], function(juration) {
    "use strict";

    var Duration = function(seconds)
    {
        var pri = {};
        if (seconds == null) {
          seconds = 60*10;
        }

        pri.seconds = seconds;

        this.getHuman = function()
        {
            return juration.humanize(pri.seconds);
        };
        this.getSeconds = function()
        {
            return pri.seconds;
        };
        this.setSeconds = function(seconds)
        {
            pri.seconds = seconds;
        };
    };

    return Duration;
});