var htwo = io.connect("https://spark-esport-data.herokuapp.com/")
var hone = io.connect("https://spark-esport.herokuapp.com/");
var elem1 = document.getElementById("img1");
var elem2 = document.getElementById("img2");
var elem3 = document.getElementById("img3");
var elem4 = document.getElementById("img4");
var elem5 = document.getElementById("img5");
var value = 0;
var res = "";
var save = "noset";

chrome.tabs.getSelected(null, function(tab) {
    tab.id = tab.id;
    tabUrl = tab.url;
    var str = tab.url.split("/", 4)
    res = str[3];
    if (res == "")
        res = str[2];

    if (save != res && (str[2] == "www.twitch.tv" || str[2] == "corobizar.com" || str[2] == "domingo.tv" || str[2] == "www.skyyart.fr"))
    {
        if (str[2] == "corobizar.com")
            res = "corobizar.com";
        if (str[2] == "domingo.tv")
            res = "domingo.tv";
        if (str[2] == "www.skyyart.fr")
            res = "www.skyyart.fr";
        save = res;
        var _opt = {
            type: "basic",
            title: "Spark Now !",
            message: "Un vote a été lancé, ouvre le popup !",
            iconUrl: "ICONS/Icon128-01-01.png",
        }
    }
});


if (elem1 != null && value == 0)
{
    elem1.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $(".imgreponse").css("-webkit-filter", "brightness(130%)");
            $("#img1").css("cursor", "pointer");
        }
    });

    elem1.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $(".imgreponse").css("-webkit-filter", "brightness(80%)");
            $("#img1").css("cursor", "default");
        }
    });
    elem1.addEventListener("click", function () {
        if (value == 0)
        {
            $("#titrereponse").css("margin-left", "130px")
            $("#titrereponse").css("font-size", "20px")
            $("#titrereponse").css("font-size", "35px")
            $("#titrereponse2").css("margin-left", "-170px")
            $("#titrereponse", "#titrereponse3, #titrereponse4", "#titrereponse2", "#titrereponse5").css("margin-left", "0px")
            $("#titrereponse3, #titrereponse4").css("margin-left", "-212px")
            $("#titrereponse5").css("margin-left", "-160px")
            $(".imgreponse").css("-webkit-filter", "hue-rotate(50deg) brightness(130%)")
            $("#img1").css("cursor", "default")            
            htwo.emit("AwnserEvent",    {name: save,
                                        message: "1"});
        }
        value++;
    });
}

if (elem2 != null && value == 0)
{
    elem2.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $(".imgreponse2").css("-webkit-filter", "brightness(110%)");
            $("#img2").css("cursor", "pointer");
        }
    });

    elem2.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $(".imgreponse2").css("-webkit-filter", "brightness(80%)");
            $("#img2").css("cursor", "default");
        }
    });
    elem2.addEventListener("click", function () {
        if (value == 0)
        {
            $("#titrereponse", "#titrereponse3, #titrereponse4", "#titrereponse2", "#titrereponse5").css("margin-left", "0px")
            $("#titrereponse2").css("margin-left", "60px")
            $("#titrereponse2").css("font-size", "20px")
            $("#titrereponse2").css("font-size", "35px")
            $("#titrereponse").css("margin-left", "-210px")
            $("#titrereponse3, #titrereponse4").css("margin-left", "-212px")
            $("#titrereponse5").css("margin-left", "-160px")
            $(".imgreponse2").css("-webkit-filter", "hue-rotate(50deg) brightness(110%)")
            $("#img2").css("cursor", "default")
            htwo.emit("AwnserEvent",    {name: save,
                                        message: "2"});
        }
        value++;
    });
}

if (elem3 != null && value == 0)
{
    elem3.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $(".imgreponse3").css("-webkit-filter", "brightness(130%)");
            $("#img3").css("cursor", "pointer");
        }
    });

    elem3.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $(".imgreponse3").css("-webkit-filter", "brightness(80%)");
            $("#img3").css("cursor", "default");
        }
    });
    elem3.addEventListener("click", function () {
        if (value == 0)
        {
            $("#titrereponse", "#titrereponse3, #titrereponse4", "#titrereponse2", "#titrereponse5").css("margin-left", "0px")
            $("#titrereponse3").css("margin-left", "130px")
            $("#titrereponse3").css("font-size", "20px")
            $("#titrereponse3").css("font-size", "35px")
            $("#titrereponse").css("margin-left", "-210px")
            $("#titrereponse4").css("margin-left", "-212px")
            $("#titrereponse5, #titrereponse2").css("margin-left", "-160px")
            $(".imgreponse3").css("-webkit-filter", "hue-rotate(50deg) brightness(130%)")
            $("#img3").css("cursor", "default")
            htwo.emit("AwnserEvent",    {name: save,
                                        message: "3"});
        }
        value++;
    });
}

if (elem4 != null && value == 0)
{
    elem4.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $(".imgreponse4").css("-webkit-filter", "brightness(130%)");
            $("#img4").css("cursor", "pointer");
        }
    });

    elem4.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $(".imgreponse4").css("-webkit-filter", "brightness(80%)");
            $("#img4").css("cursor", "default");
        }
    });
    elem4.addEventListener("click", function () {
        if (value == 0)
        {
            $("#titrereponse", "#titrereponse3, #titrereponse4", "#titrereponse2", "#titrereponse5").css("margin-left", "0px")
            $("#titrereponse4").css("margin-left", "130px")
            $("#titrereponse4").css("font-size", "20px")
            $("#titrereponse4").css("font-size", "35px")
            $("#titrereponse").css("margin-left", "-210px")
            $("#titrereponse3").css("margin-left", "-212px")
            $("#titrereponse5, #titrereponse2").css("margin-left", "-160px")
            $(".imgreponse4").css("-webkit-filter", "hue-rotate(50deg) brightness(130%)")
            $("#img4").css("cursor", "default")
            htwo.emit("AwnserEvent",    {name: save,
                                        message: "4"});
        }
        value++;
    });
}

if (elem5 != null && value == 0)
{
    elem5.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $(".imgreponse5").css("-webkit-filter", "brightness(130%)");
            $("#img5").css("cursor", "pointer");
        }
    });

    elem5.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $(".imgreponse5").css("-webkit-filter", "brightness(80%)");
            $("#img5").css("cursor", "default");
        }
    });
    elem5.addEventListener("click", function () {
        if (value == 0)
        {
            $("#titrereponse", "#titrereponse3, #titrereponse4", "#titrereponse2", "#titrereponse5").css("margin-left", "0px")
            $("#titrereponse5").css("margin-left", "45px")
            $("#titrereponse5").css("font-size", "20px")
            $("#titrereponse5").css("font-size", "33px")
            $("#titrereponse").css("margin-left", "-210px")
            $("#titrereponse3, #titrereponse4").css("margin-left", "-212px")
            $("#titrereponse2").css("margin-left", "-160px")
            $(".imgreponse5").css("-webkit-filter", "hue-rotate(50deg) brightness(130%)")
            $("#img5").css("cursor", "default")
            htwo.emit("AwnserEvent",    {name: save,
                                        message: "5"});
        }
        value++;
    });
}