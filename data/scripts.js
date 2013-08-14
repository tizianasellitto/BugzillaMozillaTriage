
window.onload = function() {
    var eSelect = document.getElementById('transfer_reason');
    var optOtherReason = document.getElementById('otherdetail');
    eSelect.onchange = function() {
        if(eSelect.value === "getUser") {
            getUser();
        }
        else if(eSelect.value === "getUserBugs") {
            getUserBugs();
        }
        else if(eSelect.value === "getUserAssignedBugs") {
            getUserAssignedBugs();
        }
        else if(eSelect.value === "getUserQAcontactBugs") {
            getUserQAcontactBugs();
        }
        eSelect.selectedIndex=0;
    }
}


addon.port.on("show", function () {
              document.getElementById("results").innerHTML = "";
              document.getElementById("notification").innerHTML ="";
              });

function openBug(id){
    addon.port.emit('openBug',id);
}

function openUrl(url){
    addon.port.emit('open',url);
}

//get user info
function getUser(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUser', user.value);
}

addon.port.on('user', user);

function user(response) {
    if(response.result!=null && response.result.users.length!=0){
        document.getElementById("notification").innerHTML = "Get user Info of "+ response.result.users[0].name;
        document.getElementById("results").innerHTML = response.result.users[0].real_name;
    }
    else
        document.getElementById("notification").innerHTML = "No user with that mail";
}


//get user reported bugs
function getUserBugs(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserBugs', user.value);
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
    if(response.result!=null &&  response.result.bugs.length==0){
        document.getElementById("notification").innerHTML = "No Bugs reported by the user selected";
        document.getElementById("results").innerHTML = "";
    }
    else{
        document.getElementById("notification").innerHTML = "Get Bugs reported by "+ response.result.bugs[0].creator;
        document.getElementById("results").innerHTML = "";
        
        var values="<table width='98%' border='1' cellpadding='5' cellspacing='0'>";
        values+="<tr>";
        values += "<td> ID </td>";
        values += "<td> Bug Status </td>";
        values += "<td> Bug Last Update </td>";
        values += "<td> Bug Summary</td>";
        values+="</tr>";
        
        var oldHTML = document.getElementById('results').innerHTML;
        response.result.bugs.forEach(function(entry) {
                                     values+="<tr>";
                                     values += "<td> <a href='' onclick='javascript:openBug("+entry.id+")'>"+ entry.id + "</a> </td>";
                                     values += "<td> "+ entry.status + "</td>";
                                     values += "<td> "+ entry.last_change_time + " </td>";
                                     values += "<td> "+ entry.summary +"</td>";
                                     values+="</tr>";
                                     });
        values+="</table>";
        document.getElementById("results").innerHTML = values ;
    }
}


//get user assigned bugs
function getUserAssignedBugs(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserAssignedBugs', user.value);
}

addon.port.on('userAssignedBugs', userAssignedBugs);

function userAssignedBugs(response) {
    if(response.result!=null && response.result.bugs.length==0){
        document.getElementById("notification").innerHTML = "No Bugs assigned to the user selected";
        document.getElementById("results").innerHTML = "";
    }
    else{
        document.getElementById("notification").innerHTML = "Get Bugs assigned to "+ response.result.bugs[0].assigned_to;
        document.getElementById("results").innerHTML = "";
        var values="<table width='98%' border='1' cellpadding='5' cellspacing='0'>";
        values+="<tr>";
        values += "<td> ID </td>";
        values += "<td> Bug Status </td>";
        values += "<td> Bug Last Update </td>";
        values += "<td> Bug Summary</td>";
        values+="</tr>";
        
        var oldHTML = document.getElementById('results').innerHTML;
        
        response.result.bugs.forEach(function(entry) {
                                     values+="<tr>";
                                     values += "<td> <a href='' onclick='javascript:openBug("+entry.id+")'>"+ entry.id + "</a> </td>";
                                     values += "<td> "+ entry.status + "</td>";
                                     values += "<td> "+ entry.last_change_time + " </td>";
                                     values += "<td> "+ entry.summary +"</td>";
                                     values+="</tr>";
                                     });
        values+="</table>";
        document.getElementById("results").innerHTML = values ;
        
    }
    
}

//get user qa contact bugs
function getUserQAcontactBugs(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserQAcontactBugs', user.value);
}

addon.port.on('userQAcontactBugs', userQAcontactBugs);

function userQAcontactBugs(response) {
    if(response.result!=null &&  response.result.bugs.length==0){
        document.getElementById("notification").innerHTML = "No Bugs where the QA contatct is the user selected";
        document.getElementById("results").innerHTML = "";
    }else
    {
        document.getElementById("notification").innerHTML = "Get Bugs with QA Contact set to "+ response.result.bugs[0].qa_contact;
        document.getElementById("results").innerHTML = "";
        var values="<table width='98%' border='1' cellpadding='5' cellspacing='0'>";
        values+="<tr>";
        values += "<td> ID </td>";
        values += "<td> Bug Status </td>";
        values += "<td> Bug Last Update </td>";
        values += "<td> Bug Summary</td>";
        values+="</tr>";
        
        var oldHTML = document.getElementById('results').innerHTML;
        response.result.bugs.forEach(function(entry) {
                                     values+="<tr>";
                                     values += "<td> <a href='' onclick='javascript:openBug("+entry.id+")'>"+ entry.id + "</a> </td>";
                                     values += "<td> "+ entry.status + "</td>";
                                     values += "<td> "+ entry.last_change_time + " </td>";
                                     values += "<td> "+ entry.summary +"</td>";
                                     values+="</tr>";
                                     });
        values+="</table>";
        document.getElementById("results").innerHTML = values ;
        
    }
    
}


addon.port.on('loadQueryResponse', loadQueryResponse);

function loadQueryResponse(response) {
    var url= "https://bugzilla.mozilla.org/buglist.cgi?list_id=6185685&resolution=---&resolution=DUPLICATE&query_format=advanced&bug_status=UNCONFIRMED&product=Websites";
    document.getElementById("1").innerHTML = "Website bugs that are UNCO  <a href='' onclick='javascript:openUrl(\""+url+"\")'>(" +response.result.bugs.length+")</a>";
}

addon.port.on('loadQueryResponse2', loadQueryResponse2);

function loadQueryResponse2(response) {
    var currentDate = new Date();
    currentDate.setDate( currentDate.getDate()-1);
    var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
    var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
    var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    
    var url= "https://bugzilla.mozilla.org/buglist.cgi?list_id=7119720&resolution=---&resolution=DUPLICATE&chfieldto=Now&chfield=%5BBug%20creation%5D&query_format=advanced&bug_status=UNCONFIRMED&chfieldfrom="+dayString;
    document.getElementById("2").innerHTML = "Today's UNCO bugs for every product <a href='' onclick='javascript:openUrl(\""+url+"\")'>(" +response.result.bugs.length+")</a>";
}

addon.port.on('loadQueryResponse3', loadQueryResponse3);

function loadQueryResponse3(response) {
    var currentDate = new Date();
    currentDate.setMonth( currentDate.getMonth()-1);
    var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
    var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
    var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
    
    
    var url= "https://bugzilla.mozilla.org/buglist.cgi?list_id=7119507&resolution=---&resolution=DUPLICATE&chfieldto=Now&chfield=%5BBug%20creation%5D&query_format=advanced&bug_status=UNCONFIRMED&component=Untriaged&product=Firefox&chfieldfrom="+dayString;
    document.getElementById("3").innerHTML = "Untriaged Firefox -1m <a href='' onclick='javascript:openUrl(\""+url+"\")'>(" +response.result.bugs.length+")</a>";
}





//change tab active to Searches
function getSearches(){
    addon.port.emit('searches');
}

addon.port.on('searchesTabReturn', searchesTabReturn);

function searchesTabReturn(storage) {
    var listTab = document.getElementById("list");
    document.getElementById("list").className = "attivo";
    document.getElementById("new").className = "";
    
    document.getElementById('searches').style.zIndex = "1";
    document.getElementById('projects').style.zIndex = "-1";
}

//change tab active to Project
function getProjects(){
    document.getElementById("results").innerHTML = "";
    document.getElementById("notification").innerHTML ="";
    
    var newTab = document.getElementById("new");
    document.getElementById('new').className = "attivo";
    document.getElementById('list').className = "";
    document.getElementById('searches').style.zIndex = "-1";
    document.getElementById('projects').style.zIndex = "1";
    
    addon.port.emit('getProjects');
}
