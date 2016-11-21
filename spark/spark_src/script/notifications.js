//	  			-------------------------------------		\\
//	  			| Code par Quentin "Zoarre" Chemin	|		\\
// 	  			| quentin.chemin@epitech.eu			|		\\
//	  			-------------------------------------		\\

var hone = io.connect("https://spark-extension.herokuapp.com/");
var res = "";
var val = 0
var value = 0;
var save = "noset";
__mUrl = "";
adminLog = [];
_check = 0;

var spl
if (localStorage.follow)
{
	spl = localStorage.follow.split(",");
}
else
	spl = "";

var exData = [];

for (var k = 0, len = spl.length; k < len; k++)
{
	var obj = {
		sn: spl[k],
		ic: 0
	};
	exData.push(obj);
}

localStorage.data2 = "null";
localStorage.data3 = "null";
localStorage.streamer = "null";
localStorage.fullUrl = "null";

function cb (id) {
	value++;
}

var option = {
    type: "image",
    title: "Live is on !",
    message: "Artheon est en live !",
    iconUrl: "ICONS/artheon-01.png",
    imageUrl: "ICONS/testt.jpg"
}

chrome.notifications.create("test", option, cb());

hone.emit("streamers", {streamers: localStorage.follow});

	hone.on("setLive", function(data)
	{
		_check = 0;
		var i = 0;
		for (var i = 0, len = data.length; i < len; i++)
		{
			if (data[i]['ic'] == 1 && exData[i]['ic'] == 0)
			{
				_opt = {
					type: "basic",
					title: "Live is on !",
					message: (data[i]['sn'] + " est en live !"),
					iconUrl: "ICONS/logo-03.png",
				}
			if (data[i]['sn'] == "artheontv")
				_opt["iconUrl"] = "ICONS/artheon-01.png"
			if (data[i]['sn'] == "domingo.tv" || data[i]['sn'] == "corobizar.com" || data[i]['sn'] == "www.skyyart.fr")
				_mUrl = "https://";
			else
				_mUrl = "https://www.twitch.tv/";
			_mUrl = _mUrl + data[i]['sn'];
			chrome.notifications.create("connection", _opt, cb());
			chrome.notifications.onClicked.addListener(function()
			{
				if (_check == 0)
				{
				chrome.notifications.clear("connection", function(){
					var i = 0;
					i++;
				});
			chrome.tabs.getAllInWindow(window.id, function(tabs) {
			var i = 0;
  			while (i <= tabs.length - 1) {
	    		if (tabs[i].url == _mUrl) {
        			chrome.tabs.update(tabs[i].id, {selected: true});
        		return ;
    	  		}
    	  		i++;
	    	}
	    		console.log("tab created");
		    	chrome.tabs.create({
		    		url: _mUrl,
	    			selected: true,
    			});
			});
			_check++;
			}
			});
			exData[i] = data[i];
			return ;
			}
		}
	});

var refresh_live = setInterval(function()
{
	hone.emit("getLive", {streamers: localStorage.follow})
}, 10000);

// hone.on("loggedAdmin", function(data)
// {
// 	console.log("Streamer = %s", data['name']);
// 	_opt = {
// 		type: "basic",
// 		title: "Live is on !",
// 		message: (data['name'] + " est en live !"),
// 		iconUrl: "ICONS/logo-01.gif",
// 	}
// 	if (data['name'] == "domingo.tv" || data['name'] == "corobizar.com" || data['name'] == "www.skyyart.fr")
// 		_mUrl = "https://";
// 	else
// 		_mUrl = "https://www.twitch.tv/";
// 	_mUrl = _mUrl + data['name'];
// 	chrome.notifications.create("connection", _opt, cb());
// 	chrome.notifications.onClicked.addListener(function()
// 		{
// 		chrome.notifications.clear("connection", function(){
// 			var i = 0;
// 			i++;
// 		});
// 		chrome.tabs.getAllInWindow(window.id, function(tabs) {
// 		var i = 0;
//   		while (i <= tabs.length - 1) {
// 	    if (tabs[i].url == _mUrl) {
//         	chrome.tabs.update(tabs[i].id, {selected: true});
//         	return ;
//     	  }
//     	  i++;
// 	    }
// 		    chrome.tabs.create({
// 		    	url: _mUrl,
// 	    		selected: true,
//     		});
// 	});

// 		});
// });

adminLog.splice(0, 1);

// hone.on("allAdmin", function(data)
// {
//     adminLog = data['adminLog']
//     if (adminLog[0])
//     {
//         _opt = {
//             type: "basic",
//             title: "Live is on !",
//             message: "Des streamers que tu suis sont en live !",
//             iconUrl: "ICONS/logo-01.gif",
//         }
//         chrome.notifications.create("connect", _opt, cb());
//     }
// });

// hone.on ("refreshLive", function(data)
// {
// 	adminLog.splice(0, adminLog.length);
// 	adminLog = data['adminLog'];
// });

function refresh()
{

  var timeout = setInterval(function()
  {
	chrome.tabs.getSelected(null, function(tab) {
	    tab.id = tab.id;
	    tabUrl = tab.url;
	    var str = tab.url.split("/", 4)
	    res = str[3];
	    if (res == "")
	    	res = str[2];

    if (save != res && (str[2] == "www.twitch.tv" || str[2] == "corobizar.com" || str[2] == "domingo.tv" || str[2] == "www.skyyart.fr"))
    {
    	hone.emit("LeaveClient", {room: save});
    	if (str[2] == "corobizar.com")
    		res = "corobizar.com";
    	if (str[2] == "domingo.tv")
    		res = "domingo.tv";
    	if (str[2] == "www.skyyart.fr")
    		res = "www.skyyart.fr";
    	save = res;
    	localStorage.streamer = save
    	localStorage.fullUrl = str[2]
		options = {
		  	type: "basic",
	  		title: "Spark Now !",
	  		message: "Un vote a été lancé, ouvre le popup !",
	  		iconUrl: "ICONS/logo-01.gif",
		}

		hone.emit("LoginClient",    {code: 0,
			                        room: save});
	}

	hone.on("EventClientStart", function(data)
		{
			_mUrl = "https://www.twitch.tv/" + save;
			localStorage.data2 = data['html'];
		});
	if (localStorage.data2 != "null")
	{
			chrome.notifications.create("vote", options, cb());
			chrome.notifications.onClicked.addListener(function()
			{
				chrome.notifications.clear("vote", function(){
					var i = 0;
					i++;
				});
				chrome.tabs.getAllInWindow(undefined, function(tab) {
					var i = -1;
	    			while (tab[i]) {
				    if (tab[i].url == _mUrl) {
			        	chrome.tabs.update(tab[i].id, {selected: true});
			    	  }
				    }
			    chrome.tabs.create({
			    	url: _mUrl,
			    	selected: true,
		    	});
  			});
		});
			localStorage.data3 = localStorage.data2;
			localStorage.data2 = "null";
	}
	});
  }, 2000)
}

refresh();