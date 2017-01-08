var hone = io.connect("http://spark-esport.cleverapps.io/");

var addfollow = document.getElementById("plus");
var unfollow = document.getElementById("moins");
var save = "";
var winner = false;
adminLog = []
exData = [];
val = 0;
total = 0;
saved = 0;

var spl = "";
if (localStorage.follow)
    spl = localStorage.follow.split(",");

for (var k = 0, len = spl.length; k < len; k++) {
    if (spl[k])
    {
        console.log(spl[k]);
        var obj = {
            sn: spl[k],
            ic: 0,
            st: "",
            lg: ""
        };
        exData.push(obj);
    }
}

$("#txtBox").hide();
$("#confirm").hide();
$('#game').hide();
$("#titre").css("text-align", "center");

function sparkShowResult() {
  setTimeout(function() {
    if (localStorage.data4 != "null") {
        $('#game').html(localStorage.data4);
        localStorage.data4 = "null";
    }
    hone.emit("LeaveClient", {room: localStorage.streamer + "_game"});
    hone.emit("LoginClient", {
        code: 0,
        room: localStorage.streamer
    });
  }, 3000);
}

function AnimEvent() {
    $('#NoEvent').hide("fast");
    $('#game').show("slow");
}

function updateHtml() {
  console.log("updateHtml");
  if (localStorage.data3 != "null") {
      AnimEvent();
      if (localStorage.id != "null" && localStorage.winnerid != "null") {
          winner = localStorage.winnerid === localStorage.id;
          if (winner) {
              localStorage.data4 = localStorage.winner;
          } else {
              localStorage.data4 = localStorage.looser;
          }
          localStorage.winner = "null";
          localStorage.looser = "null";
      }
      $('#game').html(localStorage.data3);
      localStorage.data3 = "null";
  }
}

$(document).ready(function() {
    function EndEvent() {
        $('#NoEvent').show("slow");
        $('#game').hide("slow");
    }

    hone.on("CancelEventClient", function() {
        $('#css_base').attr("href", "css/style.css");
        $('#css_vote').remove();
        EndEvent();
    });

    if (localStorage.data3 != "null") {
      updateHtml();
    }
});

////// INIT CAROUSEL \\\\\\

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop:false,
    margin:-50,
    nav:true,
    navText: ["<img class='fleche1' src='css/img/fleche.png'>","<img class='fleche2' src='css/img/fleche_2.png'>"],
    });
});

//// APPARITION DU LOGO \\\\\\\

$(".logo1").fadeToggle("slow");
$(".logo2").fadeToggle("slow");

//////// FONCTIONS DE GESTION DU CAROUSEL \\\\\\

$(document).ready(function() {
  var owl = $("#owl-demo"),
      i = 1,
      textholder,
      booleanValue = false;

/*  owl.owlCarousel({
    loop:true,
    margin:-50,
    nav:true,
  });*/


//////////// SET CAROUSEL AU LANCEMENT \\\\\\\\\\\\

    function set_carousel()
    {
        owl.trigger('del.owl', [0]);
        if (localStorage.follow)
        {
            if (localStorage.follow.localeCompare(save) != 0)
            {
                var res = localStorage.follow.split(",");
                var i = 0;
                while (res[i])
                {
                    data = "<div id='" + res[i] + "' class='item'><img class='imgmoins' id='" + res[i] + "' src='css/img/icon.png'></div>";
                    var content = '<div class="owl-item">' + data + '</div>';
                    owl.trigger('add.owl', [$(content), i]);
                    $(('#' + res[i])).css('background-image', ("url(" + localStorage.getItem(res[i]) + ")"));
                    $(('#' + res[i])).css('background-size', '100% 100%');
                    i++;
                }
            }
        }
        owl.trigger('refresh.owl.carousel');
    };

    function delete_carousel()
    {
        var res = localStorage.follow.split(",");
        var i = 0;
        while (res[i])
        {
            owl.trigger('del.owl', [0]);
            owl.trigger('del.owl-clone', [0]);
            i++;
        }
    }

    set_carousel();

////// GESTION DES ELEMENTS DU CAROUSEL (streamers) \\\\\\\


    function timeout_carousel()
    {

        if (exData.length == 0)
        {
            hone.emit("getLive", {streamers: localStorage.follow})

            hone.on("setLive",  function(data)
            {
                exData = data;
            });
        }
        if (exData[0])
        {
        if (exData[0]['sn'].localeCompare("null") == 0)
        {
            hone.emit("getLive", {streamers: localStorage.follow})

            hone.on("setLive", function(data)
            {
                exData = data;
            });
        }

            var get_data = setTimeout(function()
            {
                hone.emit("streamers", {streamers: localStorage.follow})
                hone.emit("getLive", {streamers: localStorage.follow})

                hone.on("setLive", function(data)
                {
                    var i = 0;
                    var k = 0;
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i]['ic'] == 1)
                        {
                            k = 0;
                            while (exData[k])
                            {
                                if (data[i]['sn'].localeCompare(exData[k]['sn']) == 0)
                                {
                                    if (exData[k]['ic'] == 0)
                                    {
                                        console.log("Exdata passé : sn = " + exData[k]['sn'])
                                        exData[k]['ic'] = 1;
                                        total++;
                                    }
                                }
                                k++;
                            }
                        }
                    }
                });
            }, 5000)

    var data = "";
    if (localStorage.follow)
    {
        if (exData[0]['sn'].localeCompare("null") != 0)
        {
            if (saved != total)
            {
                delete_carousel();
                hone.emit("streamers", {streamers: localStorage.follow});
                var i = 0;
                while (exData[i])
                {
                    myUrl = "https://www.twitch.tv/" + exData[i]['sn'];
                    if (exData[i]['ic'] == 0)
                    {
                        data = "<div id='" + exData[i]['sn'] + "' class='item'><img class='imgmoins' id='" + exData[i]['sn'] + "' src='css/img/icon.png'></div>";
                        var content = '<div class="owl-item">' + data + '</div>';
                        owl.trigger('add.owl.carousel', [$(content), i])
                        $(('#' + exData[i]['sn'])).css('background-image', ("url(" + localStorage.getItem(exData[i]['sn']) + ")"));
                        $(('#' + exData[i]['sn'])).css('background-size', '100% 100%');
                    }
                    else
                    {
                        data = "<div id='" + exData[i]['sn'] + "' class='item2'><img class='imgmoins' id='" + exData[i]['sn'] + "' src='css/img/icon.png'></div>";
                        var content = '<div class="owl-item">' + data + '</div>';
                        owl.trigger('add.owl.carousel', [$(content), i])
                        $(('#' + exData[i]['sn'])).css('background-image', ("url(" + localStorage.getItem(exData[i]['sn']) + ")"));
                        $(('#' + exData[i]['sn'])).css('background-size', '100% 100%');
                    }
                    i++;
                }
                saved = total;
                owl.trigger('refresh.owl.carousel');
            }
        }
    }
    }

        $(".item2").off()
        $(".item2").click(function(){
            chrome.tabs.create({
                url: "https://www.twitch.tv/" + event.target.id,
                selected: true,
            })
        });
        $(".item2").mouseover(function()
        {
            if (event.target.id)
            {
                $("#titre").text(event.target.id.toUpperCase());
                $("#titre").css("text-align", "center");
            }
        });
        $(".item2").mouseout(function()
        {
            if (event.target.id)
            {
                $("#titre").text("SPARK");
                $("#titre").css("text-align", "center");
            }
        });
        $(".item").mouseover(function()
        {
            if (event.target.id)
            {
                $("#titre").text(event.target.id.toUpperCase());
                $("#titre").css("text-align", "center");
            }
        });
        $(".item").mouseout(function()
        {
            if (event.target.id)
            {
                $("#titre").text("SPARK");
                $("#titre").css("text-align", "center");
            }
        });
    }

    function time_this()
    {
        var timeout = setTimeout(function()
        {
            timeout_carousel();
            $('.imgmoins').off();
            $(".imgmoins").click(function(){
                var i = 0;
                var j = 0;
                var resTab = [];
                var tab_follow;
                var name = event.target.id;
                tab_follow = localStorage.follow.split(",")
                while (tab_follow[i])
                {
                    if (tab_follow[i] == name)
                    {
                        i++;
                    }
                    if (tab_follow[i])
                    {
                        resTab[j] = tab_follow[i]
                        i++;
                        j++;
                    }
                }
                localStorage.follow = "";
                localStorage.follow = resTab.toString();
                location.reload();
            });
            time_this();
        }, 3000);
    }

    addfollow.addEventListener("click", function()
    {
        if (localStorage.streamer != "null" && localStorage.fullUrl != "null")
        {
            if (localStorage.follow)
            {
                var res = localStorage.follow.split(",");
                var i = 0;

                while (res[i] && i != -1)
                {
                    if (localStorage.streamer == res[i])
                        i = -2;
                    i++;
                }
                if (i != -1)
                    localStorage.follow += "," + localStorage.streamer;
            }
            else
            {
                localStorage.follow = localStorage.streamer;
            }
            location.reload();
        }
    });

    $("#twitter").click(function()
    {
        chrome.tabs.create({
            url: "https://twitter.com/SparkExtension",
            selected: true,
        });
    });

    $(".imgmoins").click(function(){
        var i = 0;
        var j = 0;
        var resTab = [];
        var tab_follow;
        var name = event.target.id;
        tab_follow = localStorage.follow.split(",")
        while (tab_follow[i])
        {
            if (tab_follow[i] == name)
            {
                i++;
            }
            if (tab_follow[i])
            {
                resTab[j] = tab_follow[i]
                i++;
                j++;
            }
        }
        localStorage.follow = "";
        localStorage.follow = resTab.toString();
        location.reload();
    });

    time_this();
});
