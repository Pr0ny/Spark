//              ---------------------------------           \\
//              | Victor ... Nettoyeur          |           \\
//              ---------------------------------           \\

var hone = io.connect("https://spark-extension.herokuapp.com/");
var htwo = io.connect("https://spark-esport-data.herokuapp.com/")

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
});

    chrome.tabs.getSelected(null, function(tab) {
        tab.id = tab.id;
        tabUrl = tab.url;
        var str = tab.url.split("/", 4)
        var res = str[3];
        if (res == "")
            res = str[2];

        hone.emit("LoginClient",    {code: 0,
                                        room: res}); 
    });

if (localStorage.data3 != "null")
{
    $('#NoEvent').hide("fast");
    $('#vote').show("slow");    
    $('#vote').html(localStorage.data3);
    $('#css_base').attr("href", "");
    localStorage.data3 = "null";
}