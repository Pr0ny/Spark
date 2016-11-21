var screenHeight = window.screen.availHeight;
var screenWidth = window.screen.availWidth;
var size = [500,472];
var _myWindow;
var _test;

screenHeight -= 1900;

chrome.runtime.getPlatformInfo(function(info) {
console.log(info.os);
    if (info.os == "win")
    {
        size[0] = 516;
        size[1] = 510;
    }
});

function resizeWin() {
    _myWindow.resizeTo(size[0], size[1]);
}

chrome.browserAction.onClicked.addListener(function() {
        _myWindow = chrome.windows.create({
            url: "index_streamer2.html",
            type: "popup",
//            left: 100;
//            top: 100;
            width: size[0],
            height: size[1],
//            left: 1000;
//            top: 1000, 
            });
//        resizeWin();
/*        _myWindow = window.open("index_streamer2.html", "Spark", "width=500, height=500, top=screenHeight, left=screenWidth");
        resizeWin();

    _myWindow.onload = function() {
    var test = _myWindow.document.getElementById("test2")

    console.log(test);
}*/
});

/*test.addEventListener("click", function()
{
    console.log("NIKE TA MERE");
    alert("je passe là !");
});*/
/*var test = _myWindow.document.getElementById("test2");

alert(test);

test.addEventListener("click", function()
{
    alert("je passe là!");
});*/