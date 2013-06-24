addon.port.on("show", function () {
              document.getElementById("results").innerHTML = "";
              });

function getUser(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUser', user.value);
}

addon.port.on('user', user);

function user(response) {
    document.getElementById("results").innerHTML = response.result.users[0].real_name;
}


function getUserBugs(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserBugs', user.value);
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
    document.getElementById("results").innerHTML = "";
    var values="";
    var oldHTML = document.getElementById('results').innerHTML;
    response.result.bugs.forEach(function(entry) {
                                 values += "<p> ID :"+ entry.id + " Bug Summary: "+ entry.summary +"</p>";
                                 });
    document.getElementById("results").innerHTML = values ;
}



function getUserAssignedBugs(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserAssignedBugs', user.value);
}

addon.port.on('userAssignedBugs', userAssignedBugs);

function userAssignedBugs(response) {
    document.getElementById("results").innerHTML = "";
    var values="";
    var oldHTML = document.getElementById('results').innerHTML;
    response.result.bugs.forEach(function(entry) {
                                 values += "<p> ID :"+ entry.id + " Bug Status: "+ entry.status + " Bug Last Update: "+ entry.last_change_time + " Bug Summary: "+ entry.summary +"</p>";
                                 });
    document.getElementById("results").innerHTML = values ;
}
