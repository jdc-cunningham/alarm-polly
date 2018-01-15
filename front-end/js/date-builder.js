function returnDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

// get date time values
const today = new Date(),
    weekday = today.getDay(),
    weekdayArray = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    day = today.getDate(),
    month = today.getMonth(), // January is 0!
    monthAlt = month + 1,
    monthEndLimit = 12,
    year = today.getFullYear(),
    yearEndLimit = year + 1,
    yearStartLimit = year,
    dayEndLimit = returnDaysInMonth(month,year),
    monthWordArray = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    altHour = today.getHours(),
    hour = altHour % 12,
    minute = today.getMinutes(),
    period = altHour >= 12 ? 'PM' : 'AM';

// get pick date elements
const pickDateRecurring = document.querySelector('#tplr-checkbox'),
    pickDateMonth = document.querySelector('#tpfpd-month'),
    pickDateDay = document.querySelector('#tpfpd-day'),
    pickDateYear = document.querySelector('#tpfpd-year'),
    pickDateHour = document.querySelector('#tpfpd-hour'),
    pickDateMinute = document.querySelector('#tpfpd-minute'),
    pickDatePeriod = document.querySelector('#tpfpd-period'),
    dateTimeDomElArr = [
        pickDateMonth,
        pickDateDay,
        pickDateYear,
        pickDateHour,
        pickDateMinute,
        pickDatePeriod
    ],
    dateTimeDomElNowArr = [
        monthAlt,
        day,
        year,
        hour,
        minute,
        period
    ],
    dateTimeDomLimits = [
        [
            1,              // month
            12
        ],
        [
            1,              // day
            dayEndLimit    
        ],
        [
            yearStartLimit, // year
            yearEndLimit   
        ],
        [
            0,              // hour reflected by period
            12             
        ],
        [
            0,              // minute
            60
        ],
        [
            'AM',           // period
            'PM'
        ]
    ];

    function buildDropDown(domEl,domElNow,startLimit,endLimit) {
        // empty
        domEl.innerHTML = '';
        // check for AM PM
        let elPeriod = false;
        if (startLimit == 'AM' || startLimit == 'PM') {
            elPeriod = true;
            startLimit = 0;
            endLimit = 1;
            domElNow = domElNow == 'AM' ? '0' : '1';
        }
        for (let i = startLimit; i <= endLimit; i++) {
            let selected = '';
            if (i == domElNow) {
                selected = 'selected="selected"';
            }
            let tmpIndex = i;
            // check for AM PM
            if (elPeriod) {
                if (i == 0) {
                    tmpIndex = 'AM';
                }
                else {
                    tmpIndex = 'PM';
                }
            }
            else {
                if (i < 10) {
                    tmpIndex = '0' + i.toString();
                }
            }
            domEl.innerHTML += '<option value="' + tmpIndex + '" ' + selected + '>' + tmpIndex + '</option>';
        }
    }

    function fillTime() {
        for (let i = 0; i < dateTimeDomElArr.length; i++) {
            buildDropDown(dateTimeDomElArr[i],dateTimeDomElNowArr[i],dateTimeDomLimits[i][0],dateTimeDomLimits[i][1]);
        }
    }

    // fillTime();

    // for now call fillTime() again, could be a start poll clock
    window.onfocus = function() { // onblur as well

        // fillTime();

    }

    function returnAlarmForm() {
        return '<div id="email-scheduler-container" class="flex fcc fdc">' +
            '<div id="time-picker" class="flex fcc fdc">' +
                '<div id="tp-label" class="flex fcc fdr">' +
                    '<div id="tpl-text" class="flex flc tpl-text">Schedule an email</div>' +
                    '<div id="tpl-recurring" class="flex frc fdr">' +
                        '<div class="flex fcc tpl-text">' +
                            'Recurring' +
                        '</div>' +
                        '<input type="checkbox" id="tplr-checkbox">' +
                    '</div>' +
                '</div>' +
                '<form id="tp-form" class="flex fcc fdc">' +
                    '<div id="tpf-pick-date" class="flex fcc fdr">' +
                        '<div class="flex flc tpfpd-label">' +
                            'Pick a date' +
                        '</div>' +
                        '<div class="flex fcc fdr tpfpd-options">' +
                            '<select name="month" id="tpfpd-month" class="flex fcc pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                            '<select name="day" id="tpfpd-day" class="flex fcc  pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                            '<select name="year" id="tpfpd-year" class="flex fcc pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                    '<div id="tpf-pick-time" class="flex fcc fdr" class="flex fcc pick-date-select">' +
                        '<div class="flex flc tpfpd-label">' +
                            'Pick a time' +
                        '</div>' +
                        '<div class="flex fcc fdr tpfpd-options">' +
                            '<select name="hour" id="tpfpd-hour" class="pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                            '<select name="minute" id="tpfpd-minute" class="flex fcc pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                            '<select name="period" id="tpfpd-period" class="flex fcc pick-date-select">' +
                                '<!-- fill in with loop, but initiate today -->' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</form>' +
            '</div>' +
            '<div id="schedule-email" class="flex fcc">' +
                '<button id="se-submit" type="button">Schedule Email</button>' +
            '</div>' +
        '</div>';
    }

    // bind click listener to schedule email button
    const scheduleEmailBtn = document.querySelector('#se-submit');

    


