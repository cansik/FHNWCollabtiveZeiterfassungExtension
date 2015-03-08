//Find ttask Select List
var ttask = document.getElementById('ttask');
ttask.setAttribute('size', '100');

//Add Searchbar
var row = ttask.parentElement;
var rowContent = row.innerHTML;
row.innerHTML = '<input id="ttaskSearchField" type="text" placeholder="Suche" onkeyup="searchTTaskField(this)" />' + rowContent;

//Inject function into page
var actualCode = function searchTTaskField(searchField) {
    var tasks = document.getElementById('ttask');

    for (i = 0; i < tasks.options.length; i++) {
        var entry  = tasks.options[i];
        if(entry.text.toLowerCase().indexOf(searchField.value.toLowerCase()) > -1)
            entry.style.display = "block";
        else
            entry.style.display = "none";
    }
};
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);
