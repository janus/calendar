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
    
    var cobject;
    if(arguments.length === 3){
        cobject = new Date(year, month, date);
    }

    cobject  = cobject || new Date();
    this.currentMonth = cobject.getMonth();
    this.currentDay = cobject.getDay();
    this.currentYear = cobject.getFullYear();
    this.currentDate = cobject.getDate();
          
}

/*
It increases month by 1
*/
Calendar.prototype.nextMonth = function() {
    var cMonth = this.currentMonth;
    if(cMonth >= 0 && cMonth < 11){
        this.currentMonth = ++cMonth;
        return this;
    }
    if(cMonth === 11){
        ++this.currentYear;
        this.currentMonth = 0;
        return this;
    }
        
};

/*
It decreases month by 1
*/
Calendar.prototype.prevMonth = function() {
    var cMonth = this.currentMonth;
    if (cMonth > 0 && cMonth <= 11) {
        this.currentMonth = --cMonth;
        return this;
    }
    if (cMonth === 0) {
        --this.currentYear;
        this.currentMonth = 11;
        return this;
    }
        
};

/*
It increases year by 1
*/
Calendar.prototype.nextYear = function(){
    ++this.currentYear;
    return this;
    
};

/*
It decreases year by 1
*/
Calendar.prototype.prevYear = function()  {
    --this.currentYear;
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
        throw new Error("Bad month" + month);
    }
    if ((day < 1 ) || (day > 31)) {
        throw new Error("Bad day " + day);
    }
    var ttable = [0,3,2,5,0,3,5,1,4,6,2,4];
    var ntable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (month < 3){
        --year;
    }
    var nw = (year + Math.floor(year/4) - Math.floor(year/100) + Math.floor(year/400) + ttable[month - 1] + day) % 7;
    return ntable[nw];
    
}

/*
Private function for render month's days
Returns an Array of {Numbers} and {Null}
*/
/*
function render(that) {
    var layout = [];
    var firstDateOfMonth = zeller( that.currentYear, that.currentMonth + 1, 1);
    var numOfVoids = matchWeekNumber(firstDateOfMonth);
    while ( numOfVoids > 0) {
        layout.push(null);
        numOfVoids = numOfVoids - 1;
    }
    var numOfDays = that.monthDays(that.currentMonth ,that.currentYear);
    for(var i = 1 ;  i <= numOfDays ; i++) {
        layout.push(i);
    }
    return layout;
}

*/
Calendar.prototype.dayName = function () {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.currentDay];
};

/*
*This is zero-based, so 0 -> January
*/
Calendar.prototype.monthName = function () {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.currentMonth];
};

/*
*This is zero-based, so 0 -> 31
*/

Calendar.prototype.monthDays = function(month, year) {
    return [31, leapYear(this.currentYear)? 29 : 28, 31, 30, 31, 30 , 31, 31, 30, 31, 30, 31 ][this.currentMonth];
};

/*
Private function for render month's days
Returns an Array of {Numbers} and {Null}
*/

Calendar.prototype.render = function() {
    
    var layout = [];
    var firstDateOfMonth = zeller( this.currentYear, this.currentMonth + 1, 1);
    var numOfVoids = matchWeekNumber(firstDateOfMonth);
    while ( numOfVoids > 0) {
        layout.push(null);
        --numOfVoids;
    }
    var numOfDays = this.monthDays(this.currentMonth ,this.currentYear);
    for(var i = 1 ;  i <= numOfDays ; i++) {
        layout.push(i);
    }
    return layout;
    //To Do print the result here   
};

/*
* Simple unit test
*
*
*/

function test(computed, given) {
    var clen = computed.length;
    var glen = given.length;
    if ( clen !== glen) {
        throw new Error("Test failed: length not equal " + clen + " " + glen);
    }
    for(var i = 0; i < clen; i++) {
        if (computed[i] !== given[i]) {
            throw new Error("Test failed : Elements not same at " + i)
        }
            
    }
    return "Test Passed";
}

var testApril2017 = [null, null, null, null, null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

var testMarch2016 = [null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

var testMarch2017 = [null, null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

var testMarch2015 = [1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


test(new Calendar(2017, 2, 14).nextMonth().render(), testApril2017);
     
test(new Calendar().render(), testMarch2016);

test(new Calendar().nextYear().render(), testMarch2017);

test(new Calendar().prevYear().render(), testMarch2015);

