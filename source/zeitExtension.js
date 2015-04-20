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

    //fix for listbox hide bug
    tasks.focus();
    searchField.focus();
};

actualCode += function updateEndDate() {
    console.log('update end date');
    var startDate = document.getElementById('ttday');
    var endDate = document.getElementById('ttendday');
    endDate.value = startDate.value;
};

actualCode += function setTimeSpanToFields(zeitField) {
    var startTime = document.getElementById('started');
    var endTime = document.getElementById('ended');

    var time = zeitField.value;

    startTime.value = '00:00';
    endTime.value = time;
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
ttask.setAttribute('size', '200');

//Add Searchbar
var row = ttask.parentElement;
var rowContent = row.innerHTML;
row.innerHTML = '<input id="ttaskSearchField" type="text" placeholder="Suche" oninput="searchTTaskField(this)" />' + rowContent;


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
var timeRow = '<div class="row"> <label for="zeit">Zeit:</label> <input type="text" class="text" style="width:80px;margin:0 6px 0 0;" id="zeit" name="zeit" onblur="setTimeSpanToFields(this)" placeholder="hh:mm" realname="Zeit (: hh:mm)">';

//regexp="^([\d{2}]:)?(\d{2})$"

var elem = document.createElement('div');
elem.innerHTML = timeRow;

fieldSet.insertBefore(elem, fieldSet.children[2]);
