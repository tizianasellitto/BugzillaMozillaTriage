exports.main = function(options) {
    var Request = require("sdk/request").Request;
    var data = require("sdk/self").data;
    
    // Create a panel whose content is defined in "text-entry.html".
    var panel = require("sdk/panel").Panel({
                                           width: 750,
                                           height: 350,
                                           contentURL: data.url("index.html")
                                           });
    
    // Send the page script a message called "show" when the panel is shown.
    panel.on("show", function() {
             var params=[{"product":"Websites","status":"UNCONFIRMED","include_fields":["id"]}];
             var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
             var requestUser = Request({
                                       url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                       content: paramMethod,
                                       onComplete: function (response) {
                                       panel.port.emit("loadQueryResponse",response.json );
                                       }
                                       }).get();
             
             var currentDate = new Date();
             currentDate.setDate( currentDate.getDate()-1);
             var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
             var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
             var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
             
             var params=[{"status":"UNCONFIRMED","creation_time":dayString,"include_fields":["id"]}];
             var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
             var requestUser = Request({
                                       url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                       content: paramMethod,
                                       onComplete: function (response) {
                                       panel.port.emit("loadQueryResponse2",response.json );
                                       }
                                       }).get();
             
             var currentDate = new Date();
             currentDate.setMonth( currentDate.getMonth()-1);
             var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
             var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
             var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
             
             
             
             var params=[{"product":"Firefox","component":"Untriaged","status":"UNCONFIRMED", "creation_time":dayString,"include_fields":["id"]}];
             var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
             var requestUser = Request({
                                       url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                       content: paramMethod,
                                       onComplete: function (response) {
                                       panel.port.emit("loadQueryResponse3",response.json );
                                       }
                                       }).get();
             
             panel.port.emit("show");
             });
    
    // create toolbarbutton
    var toolbarbutton = require("toolbarbutton").ToolbarButton({
                                                               id: "bugzilla-triage",
                                                               label: "bugzilla-triage",
                                                               image: data.url("favicon.ico"),
                                                               panel: panel
                                                               });
    
    if (data.loadReason == "install") {
        toolbarbutton.moveTo({
                             toolbarID: "nav-bar",
                             forceMove: false // only move from palette
                             });
    }
    
    
    panel.port.on("getUser", function(message) {
                  if(message!="")
                  var getUser=[{"names": [message],"include_fields":["name","real_name"]}];
                  else if(mailPreference!="")
                  var getUser=[{"names":[mailPreference] ,"include_fields":["name","real_name"]} ];
                  
                  //Bugzilla Request getUser
                  var paramUser= {"method" : "User.get", "params": JSON.stringify(getUser)};
                  var user = Request({
                                     url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                     content: paramUser,
                                     onComplete: function (response) {
                                     if(response.json!=null)
                                     panel.port.emit("user",response.json );
                                     }
                                     }).get();
                  });
    
    
    
    panel.port.on("getUserBugs", function(message) {
                  if(message!="")
                  var getBugByCreator=[{"creator":[message],"include_fields":["creator","id","status","summary","last_change_time" ] } ];
                  else if(mailPreference!="")
                  var getBugByCreator=[{"creator":[mailPreference] ,"include_fields":["creator","id","status","summary","last_change_time" ]} ];
                  
                  var paramBugs= {"method" : "Bug.search", "params": JSON.stringify(getBugByCreator)};
                  //https://bugzilla.mozilla.org/jsonrpc.cgi?method=Bug.search&params=%20[{%20%20%22creator%22:%22tiziana.sel@gmail.com%22%20},%20%20%20%20{%20%22exclude_fields%22%20:%20[%22bugs.flags%22]%20%20}]
                  var userBugs = Request({
                                         url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                         content: paramBugs,
                                         onComplete: function (response) {
                                         panel.port.emit("userBugs",response.json );
                                         }
                                         }).get();
                  });
    
    
    panel.port.on("getUserAssignedBugs", function(message) {
                  if(message!="")
                  var getUserAssignedBugs=[ { "assigned_to": [message] ,"include_fields":["assigned_to","id","status","summary","last_change_time"]} ];
                  else if(mailPreference!="")
                  var getUserAssignedBugs=[ { "assigned_to": [mailPreference],"include_fields":["assigned_to","id","status","summary","last_change_time" ]} ];
                  
                  var paramAssignedBugs= {"method" : "Bug.search", "params": JSON.stringify(getUserAssignedBugs)};
                  //https://bugzilla.mozilla.org/jsonrpc.cgi?method=Bug.search&params=[{"assigned_to":["x@mozilla.com"],"limit":10,"include_fields":["id","status","summary","last_change_time"]}]
                  var userBugs = Request({
                                         url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                         content: paramAssignedBugs,
                                         onComplete: function (response) {
                                         panel.port.emit("userAssignedBugs",response.json );
                                         }
                                         }).get();
                  });
    
    
    panel.port.on("getUserQAcontactBugs", function(message) {
                  if(message!="")
                  var getUserQAcontactBugs=[ { "qa_contact": [message] ,"include_fields":["qa_contact","id","status","summary","last_change_time"]} ];
                  else if(mailPreference!="")
                  var getUserQAcontactBugs=[ { "qa_contact": [mailPreference],"include_fields":["qa_contact","id","status","summary","last_change_time" ]} ];
                  
                  var paramQAContactBugs= {"method" : "Bug.search", "params": JSON.stringify(getUserQAcontactBugs)};
                  //https://bugzilla.mozilla.org/jsonrpc.cgi?method=Bug.search&params=[{"assigned_to":["x@mozilla.com"],"limit":10,"include_fields":["id","status","summary","last_change_time"]}]
                  var userQAcontactBugs = Request({
                                                  url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
                                                  content: paramQAContactBugs,
                                                  onComplete: function (response) {
                                                  panel.port.emit("userQAcontactBugs",response.json );
                                                  }
                                                  }).get();
                  });
    
    
    var tabs = require("sdk/tabs");
    panel.port.on("openBug", function(bugID) {
                  tabs.open("https://bugzilla.mozilla.org/show_bug.cgi?id="+bugID);
                  panel.hide();
                  });
    
    //span.bz_result_count:nth-child(6)
    panel.port.on("open", function(url) {
                  tabs.open(url);
                  panel.hide();
                  });
    
    
    var prefSet = require("simple-prefs");
    var mailPreference = prefSet.prefs.mail;
    
    function onPrefChange(prefName) {
        console.log("The " + prefName + " preference changed, current value is: " +  prefSet.prefs[prefName]
                    );
    }
    
    prefSet.on("mail", onPrefChange);
    
}
