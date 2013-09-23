$(window).load(function () {
    $("select").change(changeSelectValue);
});

var userEmail="";
function validate(input) {
    if (input.validity) {
        if (input.validity.valid === true) {
          userEmail= $('#userInput').val();
        } else {
            userEmail="";
        }
    }
}

function clearSelect(){
$("select").val("0");
}

function changeSelectValue(){
    var valueSelected = $("#transfer_reason").val();
    if (valueSelected=== "getUser") {
        clearNotification();
        getUser();
    } else if (valueSelected === "getUserBugs") {
        clearNotification();
        getUserBugs();
    } else if (valueSelected=== "getUserAssignedBugs") {
        clearNotification();
        getUserAssignedBugs();
    } else if (valueSelected === "getUserQAcontactBugs") {
        clearNotification();
        getUserQAcontactBugs();
    }
}
	

function clearNotification(){
    $( ".results" ).empty();
    $( ".notification" ).empty();

    $( "#notificationTriage" ).empty();

    $("#table_results").empty();
    $("#table_results_triage").empty();
}

addon.port.on("show", function() {
    $("select").val("0");
    
    clearNotification();
            
    $("#list").addClass("attivo");
    $("#new").removeClass("attivo");
    $("#triage").removeClass("attivo");
              
    $("#searches").css('z-index',1);
    $("#projects").css('z-index',-1);
    $("#triageMe").css('z-index',-1);
    
});

function openBug(id) {
	addon.port.emit('openBug', id);
}

function openUrl(url) {
	addon.port.emit('open', url);
}

//get user info
function getUser() {
	addon.port.emit('getUser', userEmail);
}

addon.port.on('user', user);

function user(response) {
	if (response.result != null && response.result.users.length != 0) {
        $("#notification").append(
            $("<p>", { class:"notification", text: "Get user Info of "
                                            + response.result.users[0].name }));
        $("#results").append(
                $("<p>", { class:"results", text: response.result.users[0].real_name }));
	} else
        $("#notification").append(
                $("<p>", { class:"notification", text: "No user with that mail" }));
}


//get user reported bugs
function getUserBugs() {
	addon.port.emit('getUserBugs',userEmail);
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
    $(".results").empty();
	if (response.result != null && response.result.bugs.length == 0) {
        $("#notification").append(
            $("<p>", { class:"notification", text: "No bugs reported by the user selected" }));
        	} else {
        $("#notification").append(
            $("<p>", { class:"notification", text: "Get bugs reported by "
                                    + response.result.bugs[0].creator }));
        createTable(response.result.bugs,"table_results");
	}
}


//get user assigned bugs
function getUserAssignedBugs() {
	addon.port.emit('getUserAssignedBugs',userEmail);
}

addon.port.on('userAssignedBugs', userAssignedBugs);

function userAssignedBugs(response) {
    $( ".results" ).empty();

	if (response.result != null && response.result.bugs.length == 0) {
        $("#notification").append(
            $("<p>", { class:"notification", text:  "No bugs assigned to the user selected" }));
	} else {
        $("#notification").append(
            $("<p>", { class:"notification", text:  "Get bugs assigned to "
                                                    + response.result.bugs[0].assigned_to}));
	    createTable(response.result.bugs,"table_results");
    }
}


//get user qa contact bugs
function getUserQAcontactBugs() {
    addon.port.emit('getUserQAcontactBugs', userEmail);
}

addon.port.on('userQAcontactBugs', userQAcontactBugs);

function userQAcontactBugs(response) {
    $( ".results" ).empty();
	if (response.result != null && response.result.bugs.length == 0) {
        $("#notification").append(
            $("<p>", { class:"notification", text:  "No bugs where the QA contatct is the user selected"}));
	} else {
        $("#notification").append(
                        $("<p>", { class:"notification", text: "Get bugs with QA Contact set to " + response.result.bugs[0].qa_contact}));
        createTable(response.result.bugs, "table_results");
	}

}

addon.port.on('loadQueryResponse', loadQueryResponse);

function loadQueryResponse(response) {
	var url = "https://bugzilla.mozilla.org/buglist.cgi?list_id=6185685&resolution=---&resolution=DUPLICATE&query_format=advanced&bug_status=UNCONFIRMED&product=Websites";
    
    $('.list_projects').append(
        $("<li>", { class: "1" , text: "Website bugs that are UNCO"})
                  .append($("<a>", { href: "#", text: "(" + response.result.bugs.length + ")" })
                                    .click(function (event) { openUrl(url) }))
    );
  
}

addon.port.on('loadQueryResponse2', loadQueryResponse2);

function loadQueryResponse2(response) {
	var currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 1);
	var twoDigitMonth = ((currentDate.getMonth() + 1) >= 10) ? (currentDate
			.getMonth() + 1) : '0' + (currentDate.getMonth() + 1);
	var twoDigitDate = ((currentDate.getDate()) >= 10) ? (currentDate.getDate())
			: '0' + (currentDate.getDate());
	var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-"
			+ twoDigitDate;

	var url = "https://bugzilla.mozilla.org/buglist.cgi?list_id=7119720&resolution=---&resolution=DUPLICATE&chfieldto=Now&chfield=%5BBug%20creation%5D&query_format=advanced&bug_status=UNCONFIRMED&chfieldfrom="
			+ dayString;
    $('.list_projects').append(
        $("<li>", { class: "2" , text: "Today's UNCO bugs for every product"})
                .append($("<a>", { href: "#", text: "(" + response.result.bugs.length + ")" })
                                    .click(function (event) { openUrl(url) }))
    );
  
}

addon.port.on('loadQueryResponse3', loadQueryResponse3);

function loadQueryResponse3(response) {
	var currentDate = new Date();
	currentDate.setMonth(currentDate.getMonth() - 1);
	var twoDigitMonth = ((currentDate.getMonth() + 1) >= 10) ? (currentDate
			.getMonth() + 1) : '0' + (currentDate.getMonth() + 1);
	var twoDigitDate = ((currentDate.getDate()) >= 10) ? (currentDate.getDate())
			: '0' + (currentDate.getDate());
	var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-"
			+ twoDigitDate;

	var url = "https://bugzilla.mozilla.org/buglist.cgi?list_id=7119507&resolution=---&resolution=DUPLICATE&chfieldto=Now&chfield=%5BBug%20creation%5D&query_format=advanced&bug_status=UNCONFIRMED&component=Untriaged&product=Firefox&chfieldfrom="
			+ dayString;
    
    $('.list_projects').append(
        $("<li>", { class: "3" , text: "Untriaged Firefox -1 month"})
                .append($("<a>", { href: "#", text: "(" + response.result.bugs.length + ")" })
                                    .click(function (event) { openUrl(url) }))
        );
    $(".notification_projects").empty();
   
}

//change tab active to Searches
function getSearches() {
	addon.port.emit('searches');
}

addon.port.on('searchesTabReturn', searchesTabReturn);

function searchesTabReturn() {
    $("select").val("0");

    
    $("#list").addClass("attivo");
    $("#new").removeClass("attivo");
    $("#triage").removeClass("attivo");
    
    $("#searches").css('z-index',1);
    $("#triageMe").css('z-index',-1);
    $("#projects").css('z-index',-1);
}

//change tab active to Project
function getProjects() {
    $(".list_projects").empty();
    $("#notification_projects").append(
            $("<p>", { class:"notification_projects", text: "- Loading bugmaster projects" }));

    clearNotification();

    $('#new').addClass("attivo");
    $('#list').removeClass("attivo");
    $('#triage').removeClass("attivo");
    
    $("#searches").css('z-index',-1);
    $("#triageMe").css('z-index',-1);
    $("#projects").css('z-index',1);

	addon.port.emit('getProjects');
}


//change tab active to Triage
function getTriaging() {
    clearNotification();
    
    $('#triage').addClass("attivo");
    $('#list').removeClass("attivo");
    $('#new').removeClass("attivo");

    $("#searches").css('z-index',-1);
    $("#projects").css('z-index',-1);
    $("#triageMe").css('z-index',1);

    
    $("#notificationTriage").append(
        $("<p>", { class:"notificationTriage", text: "- Loading Latest Unconfirmed Bugs" }));

 	addon.port.emit('getLatestUnconfirmedBugs');

}

addon.port.on('latestUnconfirmedBugs', triagingLatestUnconfirmedBugs);

function triagingLatestUnconfirmedBugs(response) {
    if (response.result != null && response.result.bugs.length == 0) {
        $( ".notificationTriage" ).empty();
        $("#notificationTriage").append(
            $("<p>", { class:"notificationTriage", text: "No bugs" }));
    } else {
        $( ".notificationTriage" ).empty();
        $("#notificationTriage").append(
            $("<p>", { class:"notificationTriage", text: "Latest 3 UNCONFIRMED Bugs" }));
     
        createTable(response.result.bugs, "table_results_triage");
	}
}


//create dynamic tables with values returned by Bugzilla searches.
function createTable(results,table){
    
    var doc = document;
    var fragment = doc.createDocumentFragment();
    
    var row = doc.createElement('tr');
    
    var cellTh1 = doc.createElement('th');
    var textTh1 = doc.createTextNode("ID");
    cellTh1.appendChild(textTh1);
    row.appendChild(cellTh1);
    
    
    var cellTh2 = doc.createElement('th');
    var textTh2 = doc.createTextNode("Bug Status");
    cellTh2.appendChild(textTh2);
    row.appendChild(cellTh2);
    
    
    var cellTh3 = doc.createElement('th');
    var textTh3 = doc.createTextNode("Bug Last Update");
    cellTh3.appendChild(textTh3);
    row.appendChild(cellTh3);
    
    
    var cellTh4 = doc.createElement('th');
    var textTh4 = doc.createTextNode("Bug Summary");
    cellTh4.appendChild(textTh4);
    row.appendChild(cellTh4);
    
    //does not trigger reflow
    fragment.appendChild(row);
    
    results.forEach(function(entry) {
        var row = doc.createElement('tr');
        
        var cell1 = doc.createElement('td');
        var newLink=doc.createElement('a');
        newLink.setAttribute('href','#');
        newLink.addEventListener("click", function () { openBug( entry.id )}, false);
        var linkText=doc.createTextNode(entry.id );
        
        newLink.appendChild(linkText);
        
        cell1.appendChild(newLink);
        row.appendChild(cell1);
        
        var cell2 = doc.createElement('td');
        var text2 = doc.createTextNode(entry.status);
        cell2.appendChild(text2);
        row.appendChild(cell2);
        
        var cell3 = doc.createElement('td');
        var text3 = doc.createTextNode(entry.last_change_time);
        cell3.appendChild(text3);
        row.appendChild(cell3);
        
        var cell4 = doc.createElement('td');
        var text4 = doc.createTextNode(entry.summary );
        cell4.appendChild(text4);
        row.appendChild(cell4);
        
        //does not trigger reflow
        fragment.appendChild(row);
        
        });
    
    $("#"+table).empty();
    document.getElementById(table).appendChild(fragment);
}

