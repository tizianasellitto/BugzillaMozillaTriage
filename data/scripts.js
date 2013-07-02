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

//get user info
function getUser(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get user Info of "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get user Info of tiziana.sel@gmail.com";
    addon.port.emit('getUser', user.value);
}

addon.port.on('user', user);

function user(response) {
    document.getElementById("results").innerHTML = response.result.users[0].real_name;
}


//get user reported bugs
function getUserBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs reported by "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get Bugs reported by tiziana.sel@gmail.com";
    addon.port.emit('getUserBugs', user.value);
    
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
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


//get user assigned bugs
function getUserAssignedBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs assigned to "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get Bugs assigned to tiziana.sel@gmail.com";
    addon.port.emit('getUserAssignedBugs', user.value);
}

addon.port.on('userAssignedBugs', userAssignedBugs);

function userAssignedBugs(response) {
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



//get user qa contact bugs
function getUserQAcontactBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs where "+ user.value +" is  QA Contact";
    else
        document.getElementById("notification").innerHTML = "Get Bugs where tiziana.sel@gmail.com is  QA Contact";
    addon.port.emit('getUserQAcontactBugs', user.value);
}

addon.port.on('userQAcontactBugs', userQAcontactBugs);

function userQAcontactBugs(response) {
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

//get user info
function getUser(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get user Info of "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get user Info of tiziana.sel@gmail.com";
    addon.port.emit('getUser', user.value);
}

addon.port.on('user', user);

function user(response) {
    document.getElementById("results").innerHTML = response.result.users[0].real_name;
}


//get user reported bugs
function getUserBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs reported by "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get Bugs reported by tiziana.sel@gmail.com";
    addon.port.emit('getUserBugs', user.value);
    
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
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


//get user assigned bugs
function getUserAssignedBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs assigned to "+ user.value;
    else
        document.getElementById("notification").innerHTML = "Get Bugs assigned to tiziana.sel@gmail.com";
    addon.port.emit('getUserAssignedBugs', user.value);
}

addon.port.on('userAssignedBugs', userAssignedBugs);

function userAssignedBugs(response) {
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



//get user qa contact bugs
function getUserQAcontactBugs(){
    var user=document.getElementById('userInput');
    if(user.value!="")
        document.getElementById("notification").innerHTML = "Get Bugs where "+ user.value +" is  QA Contact";
    else
        document.getElementById("notification").innerHTML = "Get Bugs where tiziana.sel@gmail.com is  QA Contact";
    addon.port.emit('getUserQAcontactBugs', user.value);
}

addon.port.on('userQAcontactBugs', userQAcontactBugs);

function userQAcontactBugs(response) {
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
