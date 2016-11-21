var adm_window = document.getElementById("test");
var size = [$(window).width(), $(window).height()];

function resizeWin() {
    $(window).height(size[1]);
    $(window).width(size[0]);
}

adm_window.addEventListener("click", function()
{
    resizeWin();
    alert("je passe là!");
});