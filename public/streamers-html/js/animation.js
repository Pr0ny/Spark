var game = "null";
var giveaway = "null";

$(document).ready(function () {

    ///////////////////// -- CONNEXION -- /////////////////////

    $(".connexion div form fieldset+div input").click(function () {

        $(".connexion").css("left", "-610px")
        $(".catalogue").css("left", "0")
    });

    ///////////////////// -- POP UP CATALOGUE  -- /////////////////////

    $(".catalogue div h1+h2+div img").click(function () {

        $(".popup").css("left", "0px")
        $("#nom_streamer").css("font-size", "18px")
        $("#nom_streamer").css("left", "5.8%")
        $("#nom_streamer").css("padding-top", "20px")

    });

    $(".catalogue div h2").click(function () {

        $(".popup").css("left", "0px")
        $("#nom_streamer").css("font-size", "18px")
        $("#nom_streamer").css("left", "5.8%")
        $("#nom_streamer").css("padding-top", "20px")

    });

    $(".popup section p ").click(function () {

        $(".popup").css("left", "850px")
        $("#nom_streamer").css("font-size", "25px")
        $("#nom_streamer").css("left", "5.3%")
        $("#nom_streamer").css("padding-top", "14px")

    });

    ///////////////////// -- LISTE CHARGE -- /////////////////////

    $(".jeux_liste_1").click(function () {
        $("#charge_1").css("left", "0px")
        $("#charge_2").css("left", "700px")
        $("#charge_3").css("left", "700px")
        $("#charge_4").css("left", "700px")
        $("#charge_5").css("left", "700px")

        $("#charge_1").css("visibility", "visible")
        $("#charge_2").css("visibility", "hidden")
        $("#charge_3").css("visibility", "hidden")
        $("#charge_4").css("visibility", "hidden")
        $("#charge_5").css("visibility", "hidden")

        $("#charge_1").css("opacity", "1")
        $("#charge_2").css("opacity", "0")
        $("#charge_3").css("opacity", "0")
        $("#charge_4").css("opacity", "0")
        $("#charge_5").css("opacity", "0")
    });

    $(".jeux_liste_2").click(function () {
        $("#charge_2").css("left", "0px")
        $("#charge_1").css("left", "-700px")
        $("#charge_3").css("left", "700px")
        $("#charge_4").css("left", "700px")
        $("#charge_5").css("left", "700px")

        $("#charge_1").css("visibility", "hidden")
        $("#charge_2").css("visibility", "visible")
        $("#charge_3").css("visibility", "hidden")
        $("#charge_4").css("visibility", "hidden")
        $("#charge_5").css("visibility", "hidden")


        $("#charge_2").css("opacity", "1")
        $("#charge_1").css("opacity", "0")
        $("#charge_3").css("opacity", "0")
        $("#charge_4").css("opacity", "0")
        $("#charge_5").css("opacity", "0")

    });

    $(".jeux_liste_3").click(function () {
        $("#charge_3").css("left", "0px")
        $("#charge_1").css("left", "-700px")
        $("#charge_2").css("left", "-700px")
        $("#charge_4").css("left", "700px")
        $("#charge_5").css("left", "700px")

        $("#charge_1").css("visibility", "hidden")
        $("#charge_2").css("visibility", "hidden")
        $("#charge_3").css("visibility", "visible")
        $("#charge_4").css("visibility", "hidden")
        $("#charge_5").css("visibility", "hidden")


        $("#charge_3").css("opacity", "1")
        $("#charge_1").css("opacity", "0")
        $("#charge_2").css("opacity", "0")
        $("#charge_4").css("opacity", "0")
        $("#charge_5").css("opacity", "0")
    });

    $(".jeux_liste_4").click(function () {
        $("#charge_4").css("left", "0px")
        $("#charge_1").css("left", "-700px")
        $("#charge_2").css("left", "-700px")
        $("#charge_3").css("left", "-700px")
        $("#charge_5").css("left", "700px")

        $("#charge_1").css("visibility", "hidden")
        $("#charge_2").css("visibility", "hidden")
        $("#charge_3").css("visibility", "hidden")
        $("#charge_4").css("visibility", "visible")
        $("#charge_5").css("visibility", "hidden")


        $("#charge_4").css("opacity", "1")
        $("#charge_2").css("opacity", "0")
        $("#charge_3").css("opacity", "0")
        $("#charge_1").css("opacity", "0")
        $("#charge_5").css("opacity", "0")
    });


    $(".jeux_liste_5").click(function () {
        $("#charge_5").css("left", "0px")
        $("#charge_1").css("left", "-700px")
        $("#charge_2").css("left", "-700px")
        $("#charge_3").css("left", "-700px")
        $("#charge_4").css("left", "-700px")

        $("#charge_1").css("visibility", "hidden")
        $("#charge_2").css("visibility", "hidden")
        $("#charge_3").css("visibility", "hidden")
        $("#charge_4").css("visibility", "hidden")
        $("#charge_5").css("visibility", "visible")


        $("#charge_5").css("opacity", "1")
        $("#charge_2").css("opacity", "0")
        $("#charge_3").css("opacity", "0")
        $("#charge_4").css("opacity", "0")
        $("#charge_1").css("opacity", "0")
    });

    ///////////////////// -- MENU CATALOGUE -- /////////////////////

    $("#nom_streamer").click(function () {
        $(".popup+.menu").css("top", "120px")

    });

    $("#nom_streamer").click(function () {
        $(".popup+.menu+.fond").css("top", "0px")
    });

    $("#jeux_liste .jeux_liste_1").click(function () {
        $(".jeux_liste_1").css("border-bottom", "9px solid #fcc922")
        $(".jeux_liste_2").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_3").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_4").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_5").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
    });

    $("#jeux_liste .jeux_liste_2").click(function () {
        $(".jeux_liste_1").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_2").css("border-bottom", "9px solid #fcc922")
        $(".jeux_liste_3").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_4").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_5").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
    });


    $("#jeux_liste .jeux_liste_3").click(function () {
        $(".jeux_liste_1").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_2").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_3").css("border-bottom", "9px solid #fcc922")
        $(".jeux_liste_4").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_5").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
    });

    $("#jeux_liste .jeux_liste_4").click(function () {
        $(".jeux_liste_1").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_2").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_3").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_4").css("border-bottom", "9px solid #fcc922")
        $(".jeux_liste_5").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
    });

    $("#jeux_liste .jeux_liste_5").click(function () {
        $(".jeux_liste_1").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_2").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_3").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_4").css("border-bottom", "9px solid rgba(252, 201, 34, 0)")
        $(".jeux_liste_5").css("border-bottom", "9px solid #fcc922")
    });







    $(".popup+.menu p").click(function () {
        $(".popup+.menu").css("top", "-700px")
    });

    $(".popup+.menu p").click(function () {
        $(".popup+.menu+.fond").css("top", "-700px")
    });

    $(".popup+.menu+.fond").click(function () {
        $(".popup+.menu").css("top", "-700px")
    });

    $(".popup+.menu+.fond").click(function () {
        $(".popup+.menu+.fond").css("top", "-700px")
    });

    ///////////////////// -- CHOIX JEUX -- /////////////////////

    $(".cadeaux_jeux_charge li img+h1+img+p+h2+article p").click(function () {
        $(".choix_jeux_giveaway").css("left", "0px")
    });

    $('.runGiveaway').click(function(){
      giveaway = this.id;
    });

    $(".choix_jeux_giveaway section p").click(function () {
        $(".choix_jeux_giveaway").css("left", "700px")
    });

    ///////////////////// -- TIMER -- /////////////////////

    $(".choix_jeux_giveaway section section article").click(function () {
        $(".timer").css("left", "0px")
        $(".timer section aside+aside").css('backgroundImage', 'url(streamers-html/css/img/jeux_giveaway/jeux_1.png)');
        game = "grattage";
    });

    $(".choix_jeux_giveaway section section article+article").click(function () {
        $(".timer section aside+aside").css('backgroundImage', 'url(streamers-html/css/img/jeux_giveaway/jeux_2.png)');
        game = "casino";
    });

    $(".choix_jeux_giveaway section section+section article").click(function () {
        $(".timer section aside+aside").css('backgroundImage', 'url(streamers-html/css/img/jeux_giveaway/jeux_3.png)');
        game = "diceroll";
    });

    $(".choix_jeux_giveaway section section article").click(function () {
        start_game();
    });

    $(".choix_jeux_giveaway section section+section article+article").click(function () {
        $(".timer section aside+aside").css('backgroundImage', 'url(streamers-html/css/img/jeux_giveaway/jeux_4.png)')
    });

    $(".timer section p").click(function () {
        $(".timer").css("left", "700px");
        $(".choix_jeux_giveaway ").css("left", "700px");
    });

    $("#goMenu").click(function () {
        $(".timer").css("left", "700px")
        $(".jeux").css("left", "700px")
        timeLeft = 0;
        socketio.emit("UpdateCreditsAdmin", {
          name: _streamerName
        });
        socketio.emit("UpdateGiveawaysAdmin", {
          name: _streamerName
        });
    });

});

function start_game() {
  if (giveaway != null && game != null) {
    socketio.emit("ParticipateEventAdmin", {
      name: _streamerName,
      code: 0,
      game: game,
      giveaway: giveaway
    });
  } else {
    console.log("Can't start this game");
  }
}
