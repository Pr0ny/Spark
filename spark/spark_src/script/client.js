var hone = io.connect("http://spark-esport.cleverapps.io/");

var addfollow = document.getElementById("plus");
var save = "";
adminLog = []
exData = [];
val = 0;
total = 0;
saved = 0;

var spl = "";
if (localStorage.follow)
    spl = localStorage.follow.split(",");

for (var k = 0, len = spl.length; k < len; k++) {
    var obj = {
        sn: spl[k],
        ic: 0
    };
    exData.push(obj);
}


$(document).ready(function()
{
    function AnimEvent() {
        $('#NoEvent').hide("fast");
        $('#vote').show("slow");
    }

    function EndEvent() {
        $('#NoEvent').show("slow");
        $('#vote').hide("slow");
    }

    hone.on("EventClientStart", function(data)
    {
        $('#vote').html(data['html']);
        $('#css_base').attr("href", "");
        AnimEvent();
    });

    hone.on("CancelEventClient", function()
    {
        $('#css_base').attr("href", "css/style.css");
        $('#css_vote').remove();
        EndEvent();
    });

    if (localStorage.data3 != "null")
    {
        AnimEvent();
        $('#vote').html(localStorage.data3);
        $('#css_base').attr("href", "");
        localStorage.data3 = "null";
    }
});

////// INIT CAROUSEL \\\\\\

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop:false,
    margin:-50,
    nav:true,
    navText: ["<img class='fleche1' src='ICONS/fleche.png'>","<img class='fleche2' src='ICONS/fleche_2.png'>"],
    });
});

//////// TIME OUT POUR LA FLECHE D'EXPLICATION \\\\\\\

var logo = setTimeout(function(){
    $("#help").fadeToggle("fast");
    $(".fleche").fadeToggle("fast");
    $(".logo1").fadeToggle("slow");
    $(".logo2").fadeToggle("slow");
}, 15000);

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

////// GESTION DU TITRE \\\\\\\\

    if (localStorage.streamer == "null")
        $("#titre").text("SPARK")
    else
        {
            $('#titre').text(localStorage.streamer);
            if (localStorage.streamer == "domingo.tv")
                $('#titre').text("domingo");
            if (localStorage.streamer == "corobizar.com")
                $('#titre').text("corobizar");
            if (localStorage.streamer == "zerator.com")
                $('#titre').text("zerator");
            if (localStorage.streamer == "skyyart.fr")
                $('#titre').text("skyyart");
        }
    $("#titre").css("text-align", "center")

//////////// SET CAROUSEL AU LANCEMENT \\\\\\\\\\\\

    function set_carousel()
    {
        if (localStorage.follow)
        {
            if (localStorage.follow.localeCompare(save) != 0)
            {
                var res = localStorage.follow.split(",");
                var i = 0;
                while (res[i])
                {
                    data = "<div id='" + res[i] + "' class='item'><h4>" + res[i] + "</h4></div>";
                    var content = '<div class="owl-item">' + data + '</div>';
                    owl.trigger('add.owl', [$(content), 0]);
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
            console.log(saved);
            console.log(total);
            if (saved != total)
            {
                console.log("saved = ", saved)
                console.log("total = ", total)
                delete_carousel();
                hone.emit("streamers", {streamers: localStorage.follow});
                var i = 0;
                while (exData[i])
                {
                    myUrl = "https://www.twitch.tv/" + exData[i]['sn'];
                    if (exData[i]['ic'] == 0)
                    {
                        data = "<div id='" + exData[i]['sn'] + "' class='item'><h4 id ='" + exData[i]['sn'] +"'>" + exData[i]['sn'] + "</h4></div>";
                        var content = '<div class="owl-item">' + data + '</div>';
                        owl.trigger('add.owl.carousel', [$(content), 0])
                    }
                    else
                    {
                        data = "<div id='" + exData[i]['sn'] + "' class='item2'><h4 id='" + exData[i]['sn'] + "'>" + exData[i]['sn'] + "</h4></div>";
                        var content = '<div class="owl-item">' + data + '</div>';
                        owl.trigger('add.owl.carousel', [$(content), 0])
                    }
                    i++;
                }
                saved = total;
                owl.trigger('refresh.owl.carousel');
            }
        }
    }
    }

    if (val <= 1)
    {
        $(".item2").click(function(){
            chrome.tabs.create({
                url: "https://www.twitch.tv/" + event.target.id,
                selected: true,
            })
        });
        val++;
    }
    }

    function time_this()
    {
        var timeout = setTimeout(function()
        {
            timeout_carousel();
            time_this();
        }, 3000);
    }

    time_this();

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
            console.log(res);
            console.log(localStorage.follow);
        }
    });
});
