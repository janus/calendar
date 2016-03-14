# calendar
Simple to use:

Calendar Object

var cobject = new Calendar();

Or

var cobject = new Calendar(year, month, day);

month is {Number} eg February is 2

year is {Number}

day is {Number}


Increases month by 1 {Method}

cobject.nextMonth();

Increases yesr by 1 {Method}

cobject.nextYear();

Decreases month by 1 {Method}

cobject.prevMonth();

Decreases year by 1 {Method}

cobject.prevYear();

Return array of Number and Nulls

cobject.render()

Helper Methods:

Return the name of the day eg Monday

cobject.dayName();

Return the name of the month eg January

cobject.monthName();
