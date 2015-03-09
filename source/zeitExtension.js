//Inject functions into page
var actualCode = function searchTTaskField(searchField) {
    var tasks = document.getElementById('ttask');

    for (i = 0; i < tasks.options.length; i++) {
        var entry  = tasks.options[i];
        if(entry.text.toLowerCase().indexOf(searchField.value.toLowerCase().trim()) > -1)
            entry.style.display = "block";
        else
            entry.style.display = "none";
    }
};

actualCode += function updateEndDate() {
    console.log('update end date');
    var startDate = document.getElementById('ttday');
    var endDate = document.getElementById('ttendday');
    endDate.value = startDate.value;
};

actualCode += function setTimeSpan(zeitField) {
    var startTime = document.getElementById('started');
    var endTime = document.getElementById('ended');

    startTime.value = '00:00';
    endTime.value = zeitField.value;
}

actualCode += AddUpdateListenerToCalendar;
actualCode += AddUpdateListenerToCalendarControls;

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

//Extension Content Code
//----------------------

//Style ttask Select List
var ttask = document.getElementById('ttask');
ttask.setAttribute('size', '100');

//Add Searchbar
var row = ttask.parentElement;
var rowContent = row.innerHTML;
row.innerHTML = '<input id="ttaskSearchField" type="text" placeholder="Suche" onkeyup="searchTTaskField(this)" />' + rowContent;


//Add StartDate updater
//add calendar day select events
function AddUpdateListenerToCalendar() {
    var normalDays = document.querySelectorAll('.datepick .normalday');
    for(day in normalDays)
    {
        if(normalDays[day].setAttribute === undefined) continue;

        normalDays[day].setAttribute('onclick', normalDays[day].getAttribute('onclick') + 'updateEndDate();');
    }
}

// add calendar next / back button events
function AddUpdateListenerToCalendarControls() {
    var calButtons = document.querySelectorAll('.datepick .next, .datepick .back');
    for(btn in calButtons)
    {
        if(calButtons[btn].setAttribute === undefined) continue;

        calButtons[btn].setAttribute('onclick', 'AddUpdateListenerToCalendarControls();AddUpdateListenerToCalendar();');
    }
}

AddUpdateListenerToCalendarControls();
AddUpdateListenerToCalendar();

// add time textfield
var fieldSet = document.getElementById('started').parentElement.parentElement;
var timeRow = '<div class="row"> <label for="zeit">Zeit:</label> <input type="text" class="text" style="width:80px;margin:0 6px 0 0;" id="zeit" name="zeit" onblur="setTimeSpan(this)" placeholder="hh:mm" regexp="^([01]?\d|2[0123]):[012345]\d$" realname="Zeit (: hh:mm)">';

var elem = document.createElement('div');
elem.innerHTML = timeRow;

fieldSet.insertBefore(elem, fieldSet.children[2]);

/*
//Add Date by Button solution
var endDate = document.getElementById('ttendday');
endDate.parentElement.innerHTML += '<button onclick="updateEndDate();return false;" onfocus="this.blur();" title="Startdatum übernehmen">Startddatum</button>';
*/
