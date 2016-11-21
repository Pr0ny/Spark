var hone = io.connect("https://spark-extension.herokuapp.com/");
var htwo = io.connect("https://spark-esport-data.herokuapp.com/")

var addfollow = document.getElementById("plus");
var save = "";
adminLog = []
exData = [];
val = 0;

exData[0] = {
    sn : "null",
    ic : 0,
}

////// INIT CAROUSEL \\\\\\

function cb()
{
var i = 0;
i++;
}

var option = {
    type: "basic",
    title: "Live is on !",
    message: "Artheon est en live !",
    iconUrl: "ICONS/artheon-01.png",
    imageUrl: "ICONS/Image_Artheon.png",
}

chrome.notifications.create("test", option, cb());

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop:true,
    margin:-50,
    nav:true,
    navText: ["<img class='fleche1' src='ICONS/fleche.png'>","<img class='fleche2' src='ICONS/fleche_2.png'>"],
    });
});
                chrome.tabs.getAllInWindow(undefined, function(tab) {
                console.log(tab);
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
 
  owl.owlCarousel({
    loop:true,
    margin:-50,
    nav:true,
  });

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
        if (localStorage.follow != save)
        {
            var res = localStorage.follow.split(",");
            var i = 0;
            while (res[i])
            {
                data = "<div id='" + res[i] + "' class='item'><h4>" + res[i] + "</h4></div>";
                var content = '<div class="owl-item">' + data + '</div>';
                owl.trigger('add.owl.carousel', [$(content), 1])
                i++;
            }
            save = localStorage.follow;
        }
    }
    owl.trigger('refresh.owl.carousel');
}

//set_carousel();

////// GESTION DES ELEMENTS DU CAROUSEL (streamers) \\\\\\\


function timeout_carousel()
{

if (exData[0]['sn'] == "null")
{
    hone.emit("getLive", {streamers: localStorage.follow})

    hone.on("setLive", function(data)
    {
        exData = data;
    });
}
    var data = "";
    if (localStorage.follow && exData[0]['sn'] != null)
    {
        if (localStorage.follow != save)
        {
            hone.emit("streamers", {streamers: localStorage.follow});
            var i = 0;
            while (exData[i])
            {
                myUrl = "https://www.twitch.tv/" + exData[i]['sn'];
                if (exData[i]['ic'] == 0)
                {
                    data = "<div id='" + exData[i]['sn'] + "' class='item'><h4>" + exData[i]['sn'] + "</h4></div>";
                    var content = '<div class="owl-item">' + data + '</div>';
                    owl.trigger('add.owl.carousel', [$(content), 1])
                }
                else
                {
                    data = "<div id='" + exData[i]['sn'] + "' class='item2'><h4>" + exData[i]['sn'] + "</h4></div>";
                    var content = '<div class="owl-item">' + data + '</div>';
                    owl.trigger('add.owl.carousel', [$(content), 1])
                }
               i++;
            }
            save = localStorage.follow;
        }
    }
    owl.trigger('refresh.owl.carousel');

if (val <= 1)
{
    $(".item2").click(function(){
        chrome.tabs.create({
            url: "https://www.twitch.tv/" + event.target.id,
            selected: true,
        })
    })
    val++;
}
console.log("check !");
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
        console.log(res);
        console.log(localStorage.follow);
    }
});
});