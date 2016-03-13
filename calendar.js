'use strict';
/*
Calendar Object
var cobject = new Calendar();
Or
var cobject = new Calendar(year, month, day);
month is {Number} eg February is 2
year is {Number}
day is {Number}
*/
function Calendar(year, month, date){
    
    if(arguments.length === 0) {
        this.$P = new Date();
        this.currentMonth = this.$P.getMonth();
        this.currentDay = this.$P.getDay();
        this.currentYear = this.$P.getFullYear();
        this.currentDate = this.$P.getDate();
    }
    else if(arguments.length === 4){
        this.$P = new Date(year, month, date);
        this.currentMonth = this.$P.getMonth();
        this.currentDay = this.$P.getDay();
        this.currentYear = this.$P.getFullYear();
        this.currentDate = this.$P.getDate();
    }
          
}

/*
It increases month by 1
*/
Calendar.prototype.nextMonth = function() {
    var cMonth = this.currentMonth;
    if(cMonth >= 0 && cMonth < 11){
        cMonth++;
        this.currentMonth = cMonth;
        return this;
    }
    else if(cMonth === 11){
        console.log("This month is not possible");
        var cYear = this.currentYear;
        this.currentYear = cYear + 1;
        this.currentMonth = 0;
        return this;
    }
    else{
        console.log("This month is not possible");
        return new Calendar();
    }
        
};

/*
It decreases month by 1
*/
Calendar.prototype.prevMonth = function() {
    var cMonth = this.currentMonth;
    console.log("This month is not possible");
    if (cMonth > 0 && cMonth <= 11) {
        cMonth--;
        this.currentMonth = cMonth;
        return this;
    }
    else if (cMonth === 0) {
        var cYear = this.currentYear;
        this.currentYear = cYear - 1;
        this.currentMonth = 11;
        return this;
    }
    else {
        console.log("This month is not possible");
        return new Calendar();
    }
        
};

/*
It increases year by 1
*/
Calendar.prototype.nextYear = function(){
    console.log("This Year is not possible");
    var cYear = this.currentYear;
    this.currentYear = cYear + 1;
    return this;
    
};

/*
It decreases year by 1
*/
Calendar.prototype.prevYear = function()  {
    var cYear = this.currentYear;
    this.currentYear = cYear - 1;
    return this;
};

/*
Private funtion for finding leap year
*/
function leapYear(year) {
    return ( ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 1 : 0;
}


function matchWeekNumber(wname) {
    return {Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }[wname];
}

/*
The below is zeller's Algorithm.
http://calendars.wikia.com/wiki/Zeller's_congruence
To calculate the day of the week for any calendar date

*/
function zeller(year, month , day) {
    if ((month < 1) || (month > 12)) {
        console.log("Impossible month");
        return null;
    }
    if ((day < 1 ) || (day > 31)) {
        console.log("Imposible day");
        return null;
    }
    var ttable = [0,3,2,5,0,3,5,1,4,6,2,4];
    var ntable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (month < 3){
        year = year - 1;
    }
    var nw = (year + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400) + ttable[month - 1] + day) % 7;
    return ntable[nw];
    
}

/*
Private function for render month's days
Returns an Array of {Numbers} and {Null}
*/
function render(that) {
    var layout = [];
    var firstDateOfMonth = zeller( that.currentYear, that.currentMonth + 1, 1);
    var numOfVoids = matchWeekNumber(firstDateOfMonth);
    while ( numOfVoids > 0) {
        layout.push(null);
        numOfVoids = numOfVoids - 1;
    }
    var numOfDays = Calendar.monthDays(that.currentMonth ,that.currentYear);
    for(var i = 1 ;  i <= numOfDays ; i++) {
        layout.push(i);
    }
    return layout;
}

Calendar.weekName = function (week) {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][week];
}

Calendar.monthName = function (month) {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
};


Calendar.monthDays = function(month, year) {
    return [31, leapYear(year)? 29 : 28, 31, 30, 31, 30 , 31, 31, 30, 31, 30, 31 ][month];
}


Calendar.prototype.render = function() {
    return render(this);
    //To Do print the result here
    
    
}

