'use strict';

   
var GregorianCalendar = (function () {
/**
* Represents a gregorian calendar
* @constructor
* @param {number} year - The year of the calendar
* @param {number} month - The month of the calendar
* @param {number} day - The day of the month
*/   
function GregorianCalendar (year, month, day) {
    var cobject;
    if (arguments.length === 3) {
        cobject = new Date(year, month, day);
    }

    cobject  = cobject || new Date();
    this.currentMonth = cobject.getMonth();
    this.currentDay = cobject.getDay();
    this.currentYear = cobject.getFullYear();
    this.currentDate = cobject.getDate();               
}

/**
* A method that increases the month by 1
* @return {object} calendar
*/
GregorianCalendar.prototype.nextMonth = function () {
    var cMonth = this.currentMonth;
    if (cMonth >= 0 && cMonth < 11) {
        this.currentMonth++;
        return this;
    }
    if (cMonth === 11) {
        this.currentYear++;
        this.currentMonth = 0;
        return this;
    }
        
};

/**
* A method that decreases month by 1
* @return {object} calendar
*/
GregorianCalendar.prototype.prevMonth = function () {
    var cMonth = this.currentMonth;
    if (cMonth > 0 && cMonth <= 11) {
        this.currentMonth--;
        return this;
    }
    if (cMonth === 0) {
        this.currentYear--;
        this.currentMonth = 11;
        return this;
    }
        
};

/**
* A method that increases year by 1
* @return {object} calendar
*/
GregorianCalendar.prototype.nextYear = function () {
    this.currentYear++;
    return this;
    
};

/**
* A method that decreases year by 1
* @return {object} calendar
*/
GregorianCalendar.prototype.prevYear = function () {
    this.currentYear--;
    return this;
};

/**
* Private function for finding leap year
* @param {number} year 
* @return {boolean} 
*/
function _leapYear (year) {
    return ( ( (year % 4 === 0) && (year % 100 !== 0) ) || (year % 400 === 0) ) ? true : false;
}


/**
* Private function for finding Week Number
* @param {number} year 
* @return {number} - Returns number mapped to day of week
*/
function _matchWeekNumber(wname) {
    return {Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }[wname];
}

/**
* The below is zeller's Algorithm - calculate the day of the week for any calendar date
* http://calendars.wikia.com/wiki/Zeller's_congruence
* @param {number} year - The year under review
* @param {number} month - The month under review
* @param {number} day - The day to map to week day
* @return {string} - Day of the week
*/
function _zeller(year, month, day) {
    var ttable, ntable;
    if ( (month < 1) || (month > 12) ) {
        throw new Error("Bad month" + month);
    }
    if ( (day < 1 ) || (day > 31) ) {
        throw new Error("Bad day " + day);
    }
    ttable = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    ntable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (month < 3) {
        year--;
    }
    var nw = (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year /400) + ttable[month - 1] + day) % 7;
    return ntable[nw];
    
}

/**
* Method for finding day name
* @return {string}
*/

GregorianCalendar.prototype.dayName = function () {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.currentDay];
};

/**
* Method for finding month name
* This is zero-based, so 0 -> January
* @return {string}
*/
GregorianCalendar.prototype.monthName = function () {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.currentMonth];
};

/**
* Method for finding days in a month
* This is zero-based, so 0 -> 31
* @return {number}
*/

GregorianCalendar.prototype.monthDays = function(month, year) {
    return [31, _leapYear(this.currentYear)? 29 : 28, 31, 30, 31, 30 , 31, 31, 30, 31, 30, 31 ][this.currentMonth];
};

/**
* Method for rendering calendar
* @return {array} layout
*/

GregorianCalendar.prototype.render = function() {
    
    var i;
    var layout = [];
    var firstDateOfMonth = _zeller( this.currentYear, this.currentMonth + 1, 1);
    var numOfVoids = _matchWeekNumber(firstDateOfMonth);
    while ( numOfVoids > 0) {
        layout.push(null);
        numOfVoids--;
    }
    var numOfDays = this.monthDays(this.currentMonth ,this.currentYear);
    for (i = 1; i <= numOfDays; i++) {
        layout.push(i);
    }
    return layout;
    //To Do print the result here   
};
     
return GregorianCalendar;

 })();
/*
* Simple unit test
*
*
*/

function test(computed, given) {
    var i;
    var clen = computed.length;
    var glen = given.length;
    if (clen !== glen) {
        throw new Error("Test failed: length not equal " + clen + " " + glen);
    }
    for ( i = 0; i < clen; i++) {
        if (computed[i] !== given[i]) {
            throw new Error("Test failed : Elements not same at " + i + " and values are: computed "  + computed[i] + " and given "+ given[i] );
        }
            
    }
    return "Test Passed";
}

var testApril2017 = [null, null, null, null, null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

var testMarch2016 = [null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

var testMarch2017 = [null, null, null, 1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

var testMarch2015 = [1,  2,  3, 4, 5,  6, 7, 8,  9, 10, 11 , 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


test(new GregorianCalendar(2017, 2, 14).nextMonth().render(), testApril2017);
     
test(new GregorianCalendar().render(), testMarch2016);

test(new GregorianCalendar().nextYear().render(), testMarch2017);

test(new GregorianCalendar().prevYear().render(), testMarch2015);

