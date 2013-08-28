exports.main = function(options) {
	var Request = require("sdk/request").Request;
	var data = require("sdk/self").data;

	//set preferences mail
	var prefSet = require("simple-prefs");
	var mailPreference = prefSet.prefs.mail;
   
    //setting preference on changes in the preference manager
    function onPrefChange(prefName) {
        mailPreference = prefSet.prefs.mail;
    }
    
    prefSet.on("", onPrefChange);
	
	// Create a panel whose content is defined in "index.html".
	var panel = require("sdk/panel").Panel({
		width: 750,
		height: 350,
		contentURL: data.url("index.html")
	});
	
	// Create a widget, and attach the panel to it, so the panel is shown when the user clicks the widget.
	require("sdk/widget").Widget({
		label: "Bugmaster Extension",
		id: "Bugmaster Extension",
		contentURL: data.url("bugzilla.ico"),
		panel: panel
	});

	// Send the page script a message called "show" when the panel is shown.
	panel.on("show", function() {
		panel.port.emit("show");
	});
	
	//Open a new tab with a specific bugzilla show bug page when the message "openBug" is received
	var tabs = require("sdk/tabs");
	panel.port.on("openBug", function(bugID) {
		tabs.open("https://bugzilla.mozilla.org/show_bug.cgi?id="+bugID);
		panel.hide();
	});

    
	//Open a new url when the message "open" is received
	panel.port.on("open", function(url) {
		tabs.open(url);
		panel.hide();
	});

	
	/**
	 * the following method is used when the dropbox is selected by the user 
     * the user email used is the one in the preferences or the one inserted from the user throught the interface
	 * it uses a Request to Bugzilla Web Services to retrieve the info of the user
	 */
	panel.port.on("getUser", function(message) {
		if(message!="")
			var getUser=[{"names": [message],"include_fields":["name","real_name"]}];
		else if(mailPreference!="")
			var getUser=[{"names":[mailPreference] ,"include_fields":["name","real_name"]} ];

		//Bugzilla Request getUser
		var paramUser= {"method" : "User.get", "params": JSON.stringify(getUser)};
		var user =
			Request({
				url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
				content: paramUser,
				onComplete: function (response) {
					if(response.json!=null)
						panel.port.emit("user",response.json );
				}
			}).get();
	});


	/**
	 * the following method is used when the dropbox is selected by the user 
     * the user email used is the one in the preferences or the one inserted from the user throught the interface
	 * it uses a Request to Bugzilla Web Services to retrieve the bugs created by a specific user
	 */
	panel.port.on("getUserBugs", function(message) {
		if(message!="")
			var getBugByCreator=[{"creator":[message],"include_fields":["creator","id","status","summary","last_change_time" ] } ];
		else if(mailPreference!="")
			var getBugByCreator=[{"creator":[mailPreference] ,"include_fields":["creator","id","status","summary","last_change_time" ]} ];

		var paramBugs= {"method" : "Bug.search", "params": JSON.stringify(getBugByCreator)};
		
		//Bugzilla Request getUserBugs
		var userBugs = Request({
			url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
			content: paramBugs,
			onComplete: function (response) {
				panel.port.emit("userBugs",response.json );
			}
		}).get();
	});

	/**
	 * the following method is used when the dropbox is selected by the user
	 * the user email used is the one in the preferences or the one inserted from the user throught the interface
	 * it uses a Request to Bugzilla Web Services to retrieve the bugs assigned to a specific user
	 */
	panel.port.on("getUserAssignedBugs", function(message) {
		if(message!="")
			var getUserAssignedBugs=[ { "assigned_to": [message] ,"include_fields":["assigned_to","id","status","summary","last_change_time"]} ];
		else if(mailPreference!="")
			var getUserAssignedBugs=[ { "assigned_to": [mailPreference],"include_fields":["assigned_to","id","status","summary","last_change_time" ]} ];

		var paramAssignedBugs= {"method" : "Bug.search", "params": JSON.stringify(getUserAssignedBugs)};
		//https://bugzilla.mozilla.org/jsonrpc.cgi?method=Bug.search&params=[{"assigned_to":["x@mozilla.com"],"limit":10,"include_fields":["id","status","summary","last_change_time"]}]
		//Bugzilla Request getUserAssigned Bugs
		var userBugs = Request({
			url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
			content: paramAssignedBugs,
			onComplete: function (response) {
				panel.port.emit("userAssignedBugs",response.json );
			}
		}).get();
	});

	/**
	 * the following method is used when the dropbox is selected by the user 
	 * the user email used is the one in the preferences or the one inserted from the user throught the interface
	 * it uses a Request to Bugzilla Web Services to retrieve bugs where a specific user is setted as qa contact
	 */
	panel.port.on("getUserQAcontactBugs", function(message) {
		if(message!="")
			var getUserQAcontactBugs=[ { "qa_contact": [message] ,"include_fields":["qa_contact","id","status","summary","last_change_time"]} ];
		else if(mailPreference!="")
			var getUserQAcontactBugs=[ { "qa_contact": [mailPreference],"include_fields":["qa_contact","id","status","summary","last_change_time" ]} ];

		var paramQAContactBugs= {"method" : "Bug.search", "params": JSON.stringify(getUserQAcontactBugs)};
	
		//Bugzilla Request getUserQAcontactBugs
		var userQAcontactBugs = Request({
			url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
			content: paramQAContactBugs,
			onComplete: function (response) {
				panel.port.emit("userQAcontactBugs",response.json );
			}
		}).get();
	});


	//Send the page script a message called "searchesTabReturn" when the content ask for "Bugzilla Searches"
	panel.port.on("searches", function() {
		panel.port.emit("searchesTabReturn");
	});

	
	//Request methods for content list when user ask for "Bugmasters Projects"
	panel.port.on("getProjects", function() {
		/**Website bugs that are UNCO**/
		var params=[{"product":"Websites","status":"UNCONFIRMED","include_fields":["id"]}];
		var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
		var requestUser =
			Request({
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

		/**Today's UNCO bugs for every product**/
		var params=[{"status":"UNCONFIRMED","creation_time":dayString,"include_fields":["id"]}];
		var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
		var requestUser = 
			Request({
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


		/**Untriaged Firefox -1m **/
		var params=[{"product":"Firefox","component":"Untriaged","status":"UNCONFIRMED", "creation_time":dayString,"include_fields":["id"]}];
		var paramMethod= {"method" : "Bug.search", "params": JSON.stringify(params)};
		var requestUser = 
			Request({
				url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
				content: paramMethod,
				onComplete: function (response) {
					panel.port.emit("loadQueryResponse3",response.json );
				}
			}).get();
	});


	
	//the following method uses a Request to Bugzilla Web Services to retrieve the latest 3 UNCONFIRMED BUGS in the Triage Tab
	panel.port.on("getLatestUnconfirmedBugs", function(message) {
		var currentDate = new Date();
		currentDate.setDate( currentDate.getDate()-1);
		var twoDigitMonth=((currentDate.getMonth()+1)>=10)? (currentDate.getMonth()+1) : '0' + (currentDate.getMonth()+1);
		var twoDigitDate=((currentDate.getDate())>=10)? (currentDate.getDate()) : '0' + (currentDate.getDate());
		var dayString = currentDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;

		var params=[{"product":"Firefox","component":"Untriaged","status":"UNCONFIRMED", "creation_time":dayString, "limit":3,"include_fields":["id","status","summary","last_change_time" ]}];
		
		var paramBugs= {"method" : "Bug.search", "params": JSON.stringify(params)};
		
		//Bugzilla Request geLatestUnconfirmedBug 
		var userBugs = Request({
			url: "https://bugzilla.mozilla.org/jsonrpc.cgi",
			content: paramBugs,
			onComplete: function (response) {
				panel.port.emit("latestUnconfirmedBugs",response.json );
			}
		}).get();
	});
}
