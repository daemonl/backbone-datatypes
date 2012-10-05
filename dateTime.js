define(['juration'], function(juration) {
  "use strict";
  
  //getUTCDay returns 0(sunday)-6(saturday)
  var EnumDaysOfTheWeek = {
    0: ['Sun', 'Sunday'   , 7],
    1: ['Mon', 'Monday'   , 1],
    2: ['Tue', 'Tuesday'  , 2],
    3: ['Wed', 'Wednesday', 3],
    4: ['Thu', 'Thursday' , 4],
    5: ['Fri', 'Friday'   , 5],
    6: ['Sat', 'Saturday' , 6],
  };

// getUTC Month returns 0 - 11
  var EnumMonths = {
    0: ['Jan', 'January'],
    1: ['Feb', 'February'],
    2: ['Mar', 'March'],
    3: ['Apr', 'April'],
    4: ['May', 'May'],
    5: ['Jun', 'June'],
    6: ['Jul', 'July'],
    7: ['Aug', 'August'],
    8: ['Sep', 'September'],
    9: ['Oct', 'October'],
    10: ['Nov', 'November'],
    11: ['Dec', 'December'],
  }

    var datetime = function(input)
     {

        var ts = undefined;
        var tz = undefined;
        if (input instanceof Object)
        {
          ts = input.ts;
          tz = input.tz;
        }else{
          ts = input;
          tz = 0;
          var dObj = new Date();
          tz = dObj.getTimezoneOffset() * 60;
        }

        if (ts === undefined)
        {
          if (dObj === undefined)
          {
            var dObj = new Date();
          }
          ts = dObj.getTime();
          ts -= dObj.getTimezoneOffset() * 60;
          ts = Math.floor(ts/1000);
        }

        this.tz = tz;
        this.ts = ts;
        
        this.dateObject = 0;
        
        this.getJSON = function(){
          return {
            ts: this.ts,
            tz: this.tz   
          };
        }; 
        
        this.display = function(){
          return this.ts;
        };
        
        this.getJsTs = function(){
          return this.ts * 1000;
        }
        this.setJsTs = function(newJsTs){
          this.dateObject = 0;
          this.ts = newJsTs/1000;
        }
        this.setTs = function(newTs)
        {
          this.dateObject = 0;
          this.ts = newTs;
        }
        this.getTs = function()
        {
          return this.ts;
        }
        
        this.obj = function(){
          if (this.dateObject == 0)
          {
            this.dateObject = new Date((this.ts*1000)+(this.tz*1000));
          }
          return this.dateObject;
        };
        
        this.durationFrom = function(startTime)
        {
          var tsdif = ts - startTime.getTs();
          return juration.stringify(Math.abs(tsdif));
        }
        
        this.format = function(f){
         // console.log(this.obj());
        //  this.dateObject = new Date(this.jsts);
        //  return this.obj() + this.jsts;
          switch (f)
          {
            case undefined: f = "d-m-Y"; break;
            case 'date': f = "d-m-Y"; break;
            case 'time': f = 'h:i'; break;
            case 'datetime': f = "D d-M-y H:i h:i A"; break;
          }

          var r = "";
          for (var i = 0; i < f.length; i++)
          {
            r = r + this.getPart(f.charAt(i));
          }
          return r;
        };
        
        /*  To meet the PHP specification for date format.
         *  http://www.php.net/manual/en/function.date.php
         */
        this.getPart = function(n){
          switch(n)
          {
        // Day
            // Day of the month, 2 digits with leading zeros
            case "d": return this.leadingzero(this.obj().getUTCDate());

            // A textual representation of a day, three letters
            case "D": return EnumDaysOfTheWeek[this.obj().getUTCDay()][0];

            // Day of the month without leading zeros
            case "j": return this.obj().getUTCDate();

            // A full textual representation of the day of the week
            case "l": return EnumDaysOfTheWeek[this.obj().getUTCDay()][1];

            // ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)
            // (Monday = 1, Sunday = 7)
            case "N": return EnumDaysOfTheWeek[this.obj().getUTCDay()][2];

            // English ordinal suffix for the day of the month, 2 characters
            // st, nd, rd or th. Works well with j
            case "S": return '';

            // Numeric representation of the day of the week
            // 0 (for Sunday) through 6 (for Saturday)
            case "w": return this.obj().getUTCDay();

            // The day of the year (starting from 0)
            case "z": return "z";

        // Week
            // SO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)
            case "W": return "W";
        // Month

            // A full textual representation of a month, such as January or March
            case "F": return EnumMonths[this.obj().getUTCMonth()][1];

            // Numeric representation of a month, with leading zeros
            case "m": return this.leadingzero(this.obj().getUTCMonth() + 1);

            // A short textual representation of a month, three letters
            case "M": return EnumMonths[this.obj().getUTCMonth()][0];

            // Numeric representation of a month, without leading zeros
            case "n": return this.obj().getUTCMonth() + 1;

            // t  Number of days in the given month
            case "t": return 't';

        // Year
            // Whether it's a leap year
            case "L": return 'L';

            // ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)
            case "o": return 'o';

            // A full numeric representation of a year, 4 digits
            case "Y": return this.obj().getUTCFullYear();

            // A two digit representation of a year
            case "y": return (''+this.obj().getUTCFullYear()).substr(2,2);

        // Time

            // a Lowercase Ante meridiem and Post meridiem am or pm
            case "a":
              var h = this.obj().getUTCHours();
              return ((h > 12) || (h == 0))?"pm":"am";

            // A Uppercase Ante meridiem and Post meridiem AM or PM
            case "A":
              var h = this.obj().getUTCHours();
              return ((h > 12) || (h == 0))?"PM":"AM";

            //B Swatch Internet time  000 through 999
            case "B": return 'B';

            //g 12-hour format of an hour without leading zeros 1 through 12
            case "g": 
              var h = this.obj().getUTCHours() % 12;
              return (h==0)?12:h;

            //G 24-hour format of an hour without leading zeros 0 through 23
            case "G": return this.obj().getUTCHours();

            //h 12-hour format of an hour with leading zeros  01 through 12
            case "h": 
              var h = this.obj().getUTCHours() % 12;
              return this.leadingzero((h==0)?12:h);

            //H 24-hour format of an hour with leading zeros  00 through 23
            case "H": return this.leadingzero(this.obj().getUTCHours());

            //i Minutes with leading zeros  00 to 59
            case "i": return this.leadingzero(this.obj().getUTCMinutes());

            //s Seconds, with leading zeros 00 through 59
            case "s": return this.leadingzero(this.obj().getUTCSeconds());

            //u  Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds.
            case "u": return 0;

            case "r": return this.obj();
          }
          return n;
        };
        this.leadingzero = function(v){
          v = v + "";
          while(v.length < 2)
          {
            v = "0" + v;
          }
          return v;
        };
      }
 return datetime; 
})