addon.port.on("show", function () {
              document.getElementById("userBugs").innerHTML = "";
              document.getElementById("user").innerHTML = "";
              });

function getUser(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUser', user.value);
}

addon.port.on('user', user);

function user(response) {
    document.getElementById("userBugs").innerHTML = "";
    document.getElementById("user").innerHTML = response.result.users[0].real_name;
 }


function getUserBug(){
    var user=document.getElementById('userInput');
    addon.port.emit('getUserBugs', user.value);
}

addon.port.on('userBugs', userBugs);

function userBugs(response) {
    document.getElementById("user").innerHTML = "";
    var values="";
    var oldHTML = document.getElementById('userBugs').innerHTML;
       response.result.bugs.forEach(function(entry) {
        values += "<p> ID :"+ entry.id + " Bug Summary: "+ entry.summary +"</p>";
    });
       document.getElementById("userBugs").innerHTML = values ;
}