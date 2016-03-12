'use strict';
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

Calendar.prototype.nextYear = function(){
    console.log("This Year is not possible");
    var cYear = this.currentYear;
    this.currentYear = cYear + 1;
    return this;
    
};

Calendar.prototype.prevYear = function()  {
    var cYear = this.currentYear;
    this.currentYear = cYear - 1;
    return this;
};

function leapYear(year) {
    return ( ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 1 : 0;
}

function matchWeekNumber(wname) {
    return {Sunday: 1, Monday: 2, Tuesday: 3, Wednesday: 4, Thursday: 5, Friday: 6, Saturday: 7 }[wname];
}

function render(that) {
    //that.layout = [[], [], [], [], [], []];
    var ccdate = that.currentDate;
    var ccday = that.currentDay;
    while(ccdate >= 0) {
        if (ccdate - 7 >= 1) {
            ccdate = ccdate - 7;
        }
        else {
            break;
        }
    }
    //var cctemp = Math.abs(ccdate - 1 );
    var dname = Calendar.weekName(ccday);
    if (( dname === "Sunday") && (ccdate !== 0)) {
        ccdate = ccdate - 1;
        dname = "Saturday";      
    }
  
    console.log("current number =" + ccdate);
    var cctemp = matchWeekNumber(dname)  - ccdate;
    var dname = Calendar.weekName(cctemp);
    return [cctemp, dname];
    
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
    
}