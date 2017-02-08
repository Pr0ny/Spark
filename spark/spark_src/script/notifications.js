//	  			-------------------------------------		\\
//	  			| Code par Quentin "Zoarre" Chemin	|		\\
// 	  			| quentin.chemin@epitech.eu			|		\\
//	  			-------------------------------------		\\

var hone = io.connect("http://spark-esport.cleverapps.io/");
var res = "";
var val = 0
var value = 0;
var save = "noset";
var onLineSn = [];
_mUrl = "";
adminLog = [];
_check = 0;
var exData = [];

var obj1 = {
    url: "null",
    val: 0
}

onLineSn.push(obj1);

var spl = "";
if (localStorage.follow)
    spl = localStorage.follow.split(",");

for (var k = 0, len = spl.length; k < len; k++) {
    var obj = {
        sn: spl[k],
        ic: 0,
        st: "",
        lg: ""
    };
    exData.push(obj);
}

localStorage.data2 = "null";
localStorage.data3 = "null";
localStorage.data4 = "null";
localStorage.id = "null";
localStorage.winnerid = "null";
localStorage.streamer = "null";
localStorage.fullUrl = "null";
localStorage.winner = "null";
localStorage.looser = "null";

hone.emit("streamers", {
    streamers: localStorage.follow
});

function cb(id) {
    value++;
}

hone.on("setLive", function(data) {
    var i = 0;
    var j = 1;
    var k = 0;
    console.log(data);
    for (var i = 0, len = data.length; i < len; i++) {
        /*if (data[i]['ic'] == 0)
        {
            while(exData[k])
            {
                if (data[i]['sn'].localeCompare(exData[k]['sn']) == 0)
                {
                    if (exData[k]['ic'] == 1)
                    {
                        exData[k]['ic'] = 0;
                    }
                }
                k++;
            }
        }*/
        localStorage.setItem(data[i]['sn'], data[i]['lg']);
        if (data[i]['ic'] == 1)
        {
            k = 0;
            while (exData[k])
            {
                if (data[i]['sn'] && data[i]['sn'].localeCompare(exData[k]['sn']) == 0)
                {
                    if (exData[k]['ic'] == 0)
                    {
                        exData[k]['ic'] = 1;
                        _opt = {
                            type: "basic",
                            title: "Live is on !",
                            message: (data[i]['sn'] + " est en live !"),
                            iconUrl: data[i]['lg'],
                        }
                        if (data[i]['sn'] == "artheontv") {
                            _opt = {
                                type: "image",
                                title: "Live is on !",
                                message: (data[i]['sn'] + " est en live !"),
                                iconUrl: "ICONS/artheon-01.png",
                                imageUrl: "ICONS/artheon_notif.png",
                            }
                        }
                        if (data[i]['sn'] == "domingo.tv" || data[i]['sn'] == "corobizar.com" || data[i]['sn'] == "www.skyyart.fr")
                            _mUrl = "https://";
                        else
                            _mUrl = "https://www.twitch.tv/";

                        _mUrl = _mUrl + data[i]['sn'];
                        if (onLineSn[j] &&  onLineSn[j]['url'] != _mUrl)
                        {
                            obj2 = {
                                url: _mUrl,
                                val: 0
                            }
                            onLineSn.push(obj2);
                        }
                        else
                        {
                            obj2 = {
                                url: _mUrl,
                                val: 0
                            }
                            onLineSn.push(obj2);
                        }
                        let connection_name = data[i]['sn'];
                        chrome.notifications.create(connection_name, _opt, cb());
                        if (onLineSn[j]['val'] == 0)
                        {
                            onLineSn[j]['val'] = 1;
                            chrome.notifications.onClosed.addListener(function(notifName) {
                                        console.log("notif was cleared");
                                    });
                            chrome.notifications.onClicked.addListener(function(notifName) {
                                    chrome.notifications.clear(notifName, function(wasCleared) {console.log("Notif connection wasCleared : " + wasCleared)});
                                        console.log(connection_name);
                                        setFocusOnLiveTab(onLineSn, notifName);
                                });
                        }
                    }
                }
                k++;
            }
        }
    }
});

var refresh_live = setInterval(function() {
    hone.emit("getLive", {
        streamers: localStorage.follow
    })
}, 10000);

adminLog.splice(0, 1);

function refresh() {
    var timeout = setInterval(function() {
        chrome.tabs.query({
            active: true
        }, function(tab) {
            var str = tab[0].url.split("/", 4)
            localStorage.fullUrl = tab[0].url;
            res = str[3];
            if (res == "")
                res = str[2];

            if (save != res && (str[2] == "www.twitch.tv" ||  str[2] == "corobizar.com" || str[2] == "domingo.tv" || str[2] == "www.skyyart.fr")) {
                hone.emit("LeaveClient", {room: save});
                if (str[2] == "corobizar.com") res = "corobizar.com";
                if (str[2] == "domingo.tv") res = "domingo.tv";
                if (str[2] == "www.skyyart.fr") res = "www.skyyart.fr";
                save = res;
                localStorage.streamer = res;
                options = {
                    type: "basic",
                    title: "Spark Now !",
                    message: "Un mini-jeu a été lancé, ouvre l'extension !",
                    iconUrl: "ICONS/logo-01.gif",
                }
                hone.emit("LoginClient", {
                    code: 0,
                    room: res
                });
            }

            hone.on("EventClientStart", function(data) {
                _mUrl = "https://www.twitch.tv/" + save;
                localStorage.data2 = data['html'];
                localStorage.winnerid = data['id'];
                localStorage.winner = data['winner'];
                localStorage.looser = data['looser'];
            });

            hone.on("ParticipateEventClientStart", function(data) {
                console.log("Ok j'ai reçu la ParticipateEventClientStart");
                _mUrl = "https://www.twitch.tv/" + save;
                localStorage.data2 = data['html'];
            });

            if (localStorage.data2 != "null") {
                let vote_name = "vote" + Math.random().toString();
                chrome.notifications.create(vote_name, options, cb());
                chrome.notifications.onClicked.addListener(function(notifName) {
                    if (notifName === vote_name) {
                      chrome.notifications.clear(vote_name, function(wasCleared) {console.log("Notif vote wasCleared : " + wasCleared)});
                      setFocusOnLiveTab2();
                    }
                });
                localStorage.data3 = localStorage.data2;
                localStorage.data2 = "null";
            }
        });
    }, 2000)
}
refresh();

function isLiveOpen() {
  chrome.tabs.getAllInWindow(window.id, function(tabs) {
      var tab = tabs.map(function(elem) { return elem.url; }).indexOf("twitch.tv/" + localStorage.streamer);
      return (tab != -1);
  });
  return false;
}

function setFocusOnLiveTab2() {
    chrome.tabs.getAllInWindow(window.id, function(tabs) {
        var tab = tabs.map(function(elem) { return elem.url; }).indexOf(NewUrl);
        if (tab != -1) {
            chrome.tabs.update(tabs[tab].id, {selected: true});
        } else {
            chrome.tabs.create({
                url: NewUrl,
                selected: true,
            });
        }
    });
}

function setFocusOnLiveTab(onLineSn, connection_name) {
    var j = 1;
    var NewUrl = "https://www.twitch.tv/" + connection_name;
    chrome.tabs.getAllInWindow(window.id, function(tabs) {
      var tab = tabs.map(function(elem) { return elem.url; }).indexOf(NewUrl);
      if (tab != -1) {
        chrome.tabs.update(tabs[tab].id, {selected: true});
      } else {
        while (onLineSn[j])
        {
            if (onLineSn[j]['url'] == NewUrl)
            {
                chrome.tabs.create({
                    url: NewUrl,
                    selected: true,
                });
            }
            j++;
        }
      }
  });
}
