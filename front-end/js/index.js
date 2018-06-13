// get page elements
const elemDateToday = document.querySelector('#sd-today'),
      elemPickDays = document.querySelector('#sd-week-days');

// build week day tile picker and specify today
let dataDateNow = monthAlt + '/' + day + '/' + year,
    dataDayNow = weekdayArray[weekday];

elemDateToday.innerHTML = '<div id="sdt-text">Today is ' + dataDayNow + ' ' + dataDateNow + '</div>';

// fill in week day picker
let dayDiff = [
    '0-'
];
for (let i = 0; i < 7; i++) {
    // check if current iteration is today
    let activeDay = '',
        dayTile = '',
        dayRef = 0,
        actualDay = 0;
    if (i == weekday) {
        activeDay = 'active-day-tile';
        actualDay = day;
    }
    else if (i < weekday) {
        activeDay = 'inactive-day-tile';
        dayRef = weekday - i;
        actualDay = day - dayRef; // don't set
    }
    else {
        dayRef = i - weekday;
        actualDay = day + dayRef;
    }
    dayTile = '<div id="' + 'day-' + actualDay + '" class="flex fcc sdwd-tile ' + activeDay + '" title="' + weekdayArray[i] + '">' + weekdayArray[i].substring(0,2) + '</div>';
    elemPickDays.innerHTML += dayTile;
}

let activeDays = [],
    alarmFormVisible = false; // hidden by default

// tile listener
const dayTile = document.querySelectorAll('.sdwd-tile'),
      setAlarmPopup = document.querySelector('#setalarm-popup'),
      fieldArticleSource = document.querySelector('#as-article-source'),
      fieldSpecialMessage = document.querySelector('#as-message-field'),
      closeAlarmPopup = document.querySelector('#hide-alarm-form'),
      btnSetAlarm = document.querySelector('#sa-submit');

for (let i = 0; i < dayTile.length; i++) {
    dayTile[i].addEventListener('click', function(event) {
        // currently does not reflect selected day in loaded time
        // get day selected
        let selectedDay = this.id.split('day-')[1];
        // check active days (if already showing)
        if (activeDays.indexOf(selectedDay) !== -1) {
            // already set
            // alert('alarm already set');
            // highlight the set alarm
        }
        else {
            // no alarm set for this day
            // fill the date and time for the set alarm form
            fillTime();
            // set day
            pickDateDay.value = selectedDay;
            // show alarm set popup
            setAlarmPopup.style.display = 'flex';
            alarmFormVisible = true;
        }
    });
};

// postAjax function
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

// check if selected alarm is in the future
function checkDateTime(inpSelDateTime) {
    
    // selDate follows the format: yyyy-mm-dd hh:mm

    // function from StackOverflow
    function calcTime(city, offset) {
        // create Date object for current location
        var d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000*offset));

        // return time as a string
        return nd.toLocaleString();
    }

    let curLocaleTime = calcTime('Chicago', '+5'), // sample output 1/15/2018, 2:14:12 PM
        clt = curLocaleTime,
        cltDate = clt.split(',')[0].split('/'),
        cltYear = cltDate[2],
        cltDay = cltDate[1],
        cltMonth = cltDate[0],
        cltTime = curLocaleTime.split(', ')[1].split(':'),
        cltHour = cltTime[0],
        cltMin = cltTime[1],
        period = curLocaleTime.split(' ')[2],
        periodCorrection = period == 'PM' ? 12 : 0,
        comparisonDate = new Date('2016-09-13 2:13 PM');
        
    // hour correction based on period
    cltHour = parseInt(cltHour) + parseInt(periodCorrection);
    
    // create new dates to compare with
    let curTimeString = cltYear + '-' + cltMonth + '-' + cltDay + ' ' + cltHour + ':' + cltMin,
        curTimeDate = new Date(curTimeString.toString()),
        // selTimeString =
        selTimeDate = new Date(inpSelDateTime);
    if (selTimeDate < curTimeDate) {
        // this date is in the past
        return false;
    }
    else {
        // date in the future
        return true;
    }
    
}

// change 00 to 12
function correctBaseHour(inpHour) {
    if (inpHour == '00') {
        return 12;
    }
    else {
        return inpHour;
    }
}

// set alarm listener
btnSetAlarm.addEventListener('click', function() {
    // get data
    const timeString = (pickDateMonth.value + pickDateDay.value + pickDateYear.value + correctBaseHour(pickDateHour.value) + pickDateMinute.value + pickDatePeriod.value),
        articleSource = document.querySelector("#as-article-source").value,
        specialMessage = document.querySelector('#as-message-field').value;

    // date swap, dumb wrong format
    // timeStringNow = timeStringNow.substr(4,14).substr(0,4) + timeStringNow.substr(0,4) + timeStringNow.substr(8,14);

    // compare dates 2018-01-15 15:35
    let hourPeriodCorrection = '',
        timeStringAltFormat = '',
        modSelHour = 0;

    hourPeriodCorrection = pickDatePeriod.value == 'PM' ? 12 : 0;

    modSelHour =  parseInt(hourPeriodCorrection) + parseInt(pickDateHour.value);

    timeStringAltFormat = pickDateYear.value + '-' + pickDateMonth.value + '-' + pickDateDay.value + ' ' + correctBaseHour(modSelHour) + ':' + pickDateMinute.value;
    console.log(timeStringAltFormat);

    if (!checkDateTime(timeStringAltFormat)) {
        alert('Please select a future date.');
        return;
    }

    // package data
    const payload = 'time_string=' + timeString +
        '&article_source=' + articleSource +
        '&special_message=' + specialMessage ;
    // send POST request
    postAjax('./php/insert-alarm.php', payload, function(data){ clearSetAlarmForm(); });
    alert('alarm set!');
    // call checkScheduledAlarms
    getAjax('php/get-scheduled-alarms.php', checkScheduledAlarms);
});

// clear setAlarm fields and hide
function clearSetAlarmForm() {
    setAlarmPopup.style.display = 'none';
    fieldArticleSource.selectedIndex = 0; // reset
    fieldSpecialMessage.value = '', // reset
    alarmFormVisible = false;
}

// hide alarm set form
closeAlarmPopup.addEventListener('click', function() {
    if (alarmFormVisible) {
        clearSetAlarmForm();
    }
});


// get request
function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}

// format time string
function formatTimeString(timeString) {
    // want time output like hh:mm period
    let timeCompHour = timeString.substr(8,10).substr(0,6).substr(0,2), // this is bad
        timeCompMin = timeString.substr(10,14).substr(0,2),
        timeCompPeriod = timeString.substr(12,14);
    if (timeCompHour == 00) {
        timeCompHour = '12';
    }
    return timeCompHour + ':' + timeCompMin + ' ' + timeCompPeriod;
}

// deal with get scheduled alarms return
function checkScheduledAlarms(serverResponse) {
    let scheduledAlarms = JSON.parse(serverResponse);
    if (scheduledAlarms['status'] == 'ok') {
        // count any alarms
        const alarmCount = Object.keys(scheduledAlarms['alarms']).length;
        // remove checking for alarms... message
        let setAlarmsTarget = document.querySelector('#alarms-display');
        setAlarmsTarget.innerHTML = '';
        if (alarmCount > 0) {
            // at least one alarm exists for current day
            // build items and update page
            for (let alarm in scheduledAlarms['alarms']) {
                let scheduledAlarmContainer = '<div id="' + alarm + '" class="flex fcc fdc scheduled-alarm-container">' +
                    'Alarm set for: ' + formatTimeString(alarm) + '<br>' +
                    'Selected article source: ' + scheduledAlarms['alarms'][alarm]['article_source'] + '<br>' +
                    'Special message: ' + scheduledAlarms['alarms'][alarm]['special_message'] + '<br>' +
                '</div>';
                // add to display
                setAlarmsTarget.innerHTML += scheduledAlarmContainer;
            }
        }
        else {
            setAlarmsTarget.innerHTML = 'No scheduled alarms for today';
        }
    }
}

// get scheduled alarms and fill/update page
getAjax('php/get-scheduled-alarms.php', checkScheduledAlarms);
