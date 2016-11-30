var htwo = io.connect("https://spark-esport-data.herokuapp.com/")
var hone = io.connect("https://spark-extension.herokuapp.com/");
var elem1 = document.getElementById("img1");
var elem2 = document.getElementById("img2");
var elem3 = document.getElementById("img3");
var elem4 = document.getElementById("img4");
var elem5 = document.getElementById("img5");
var value = 0;

if (elem1 != null && value == 0)
{
    elem1.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $("#titrereponse").addClass("bordered");
            $("#img1").css("cursor", "pointer");
        }
    });

    elem1.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $("#titrereponse").removeClass("bordered");
            $("#img1").css("cursor", "default");
        }
    });

    elem1.addEventListener("click", function ()
        {
            if (value == 0)
            {
            /// -- Les titres bougent -- /// 

                $("#titrereponse").css("margin-left", "0px")
                $("#titrereponse").css("margin-left", "160px")
                $("#titrereponse2").css("margin-left", "0px")
                $("#titrereponse2").css("margin-left", "-90px")
                $("#titrereponse3, #titrereponse4").css("margin-left", "0px")
                $("#titrereponse3, #titrereponse4").css("margin-left", "-180px")
                $("#titrereponse5").css("margin-left", "0px")
                $("#titrereponse5").css("margin-left", "-70px")

            /// -- ANIME TYPOGRAPHIE -- /// 
          
                $("#titrereponse2,#titrereponse3,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-BLACK")
                $("#titrereponse2,#titrereponse3,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-LIGHT")

            /// -- ANIME BARRE BLEU SELECTIONNER-- /// 

                $(".reponse .bleu").css("width", "66")
                $(".reponse .bleu").css("width", "0")

            /// -- ANIME BARRE JAUNE SELECTIONNER -- /// 

                $(".reponse .jaune").css("height", "10")
                $(".reponse .jaune").css("height", "15")
                $(".reponse .jaune").css("width", "66")
                $(".reponse .jaune").css("width", "80")
                $(".reponse .jaune").css("margin-left", "140px")
                $(".reponse .jaune").css("margin-left", "170px")

            /// -- ANIME BARRE BLEU AUTRE-- /// 

                $(".reponse3 .bleu, .reponse4 .bleu,.reponse2 .bleu,.reponse5 .bleu").css("height", "10")
                $(".reponse3 .bleu, .reponse4 .bleu,.reponse2 .bleu,.reponse5 .bleu").css("height", "15")
                $(".reponse2 .bleu").css("width", "65")
                $(".reponse2 .bleu").css("width", "140")
                $(".reponse5 .bleu").css("width", "65")
                $(".reponse5 .bleu").css("width", "160")
                $(".reponse2 .bleu, .reponse3 .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "65px")
                $(".reponse2 .bleu, .reponse3 .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "15px")

            /// -- ANIME BARRE JAUNE AUTRE -- /// 

                $(".reponse2 .jaune, .reponse3 .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "89")
                $(".reponse2 .jaune, .reponse3 .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "0")

                $("#titrereponse").removeClass("bordered");
                $("#img1").css("cursor", "default");

            /// -- ENVOIT DE LA REPONSE -- ///

                htwo.emit("AnswerEvent",    {name: localStorage.streamer,
                                            message: "1"});

                value++;
        }
    });
}

if (elem2 != null && value == 0)
{

    elem2.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $("#titrereponse2").addClass("bordered");
            $("#img2").css("cursor", "pointer");
        }
    });

    elem2.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $("#titrereponse2").removeClass("bordered");
            $("#img2").css("cursor", "default");
        }
    });

    elem2.addEventListener("click", function()
    {
        if (value == 0)
        {
            /// -- Les titres bougent -- /// 
                $("#titrereponse2").css("margin-left", "0px")
                $("#titrereponse2").css("margin-left", "100px")
                $("#titrereponse").css("margin-left", "0px")
                $("#titrereponse").css("margin-left", "-180px")
                $("#titrereponse3, #titrereponse4").css("margin-left", "0px")
                $("#titrereponse3, #titrereponse4").css("margin-left", "-180px")
                $("#titrereponse5").css("margin-left", "0px")
                $("#titrereponse5").css("margin-left", "-70px")

            /// -- ANIME TYPOGRAPHIE -- /// 

                $("#titrereponse,#titrereponse3,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-BLACK")
                $("#titrereponse,#titrereponse3,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-LIGHT")

            /// -- ANIME BARRE BLEU SELECTIONNER-- /// 

                $(".reponse2 .bleu").css("width", "66")
                $(".reponse2 .bleu").css("width", "0")

            /// -- ANIME BARRE JAUNE SELECTIONNER -- /// 

                $(".reponse2 .jaune").css("height", "10")
                $(".reponse2 .jaune").css("height", "15")
                $(".reponse2 .jaune").css("width", "66")
                $(".reponse2 .jaune").css("width", "150")
                $(".reponse2 .jaune").css("margin-left", "140px")
                $(".reponse2 .jaune").css("margin-left", "120px")

            /// -- ANIME BARRE BLEU AUTRE-- /// 

                $(".reponse3 .bleu, .reponse4 .bleu,.reponse .bleu,.reponse5 .bleu").css("height", "10")
                $(".reponse3 .bleu, .reponse4 .bleu,.reponse .bleu,.reponse5 .bleu").css("height", "15")
                $(".reponse .bleu").css("width", "65")
                $(".reponse .bleu").css("width", "65")
                $(".reponse5 .bleu").css("width", "65")
                $(".reponse5 .bleu").css("width", "160")
                $(".reponse .bleu, .reponse3 .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "65px")
                $(".reponse .bleu, .reponse3 .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "15px")

            /// -- ANIME BARRE JAUNE AUTRE -- /// 

                $(".reponse .jaune, .reponse3 .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "89")
                $(".reponse .jaune, .reponse3 .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "0")

                $("#titrereponse2").removeClass("bordered");
                $("#img2").css("cursor", "default");

            /// -- ENVOIT DE LA REPONSE -- ///

                htwo.emit("AnswerEvent",    {name: localStorage.streamer,
                                            message: "2"});

                value++;
        }
    });
}

if (elem2 != null && value == 0)
{

    elem3.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $("#titrereponse3").addClass("bordered");
            $("#img3").css("cursor", "pointer");
        }
    });

    elem3.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $("#titrereponse3").removeClass("bordered");
            $("#img3").css("cursor", "default");
        }
    });

    elem3.addEventListener("click", function()
    {
        if (value == 0)
        {
            /// -- Les titres bougent -- /// 

                $("#titrereponse3").css("margin-left", "0px")
                $("#titrereponse3").css("margin-left", "160px")
                $("#titrereponse2").css("margin-left", "0px")
                $("#titrereponse2").css("margin-left", "-90px")
                $("#titrereponse, #titrereponse4").css("margin-left", "0px")
                $("#titrereponse, #titrereponse4").css("margin-left", "-180px")
                $("#titrereponse5").css("margin-left", "0px")
                $("#titrereponse5").css("margin-left", "-70px")

            /// -- ANIME TYPOGRAPHIE -- /// 

                $("#titrereponse2,#titrereponse,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-BLACK")
                $("#titrereponse2,#titrereponse,#titrereponse4,#titrereponse5").css("font-family", "PROXIMANOVA-LIGHT")

            /// -- ANIME BARRE BLEU SELECTIONNER-- /// 

                $(".reponse3 .bleu").css("width", "66")
                $(".reponse3 .bleu").css("width", "0")

            /// -- ANIME BARRE JAUNE SELECTIONNER -- /// 

                $(".reponse3 .jaune").css("height", "10")
                $(".reponse3 .jaune").css("height", "15")
                $(".reponse3 .jaune").css("width", "66")
                $(".reponse3 .jaune").css("width", "80")
                $(".reponse3 .jaune").css("margin-left", "140px")
                $(".reponse3 .jaune").css("margin-left", "170px")

            /// -- ANIME BARRE BLEU AUTRE-- /// 

                $(".reponse .bleu, .reponse4 .bleu, .reponse2 .bleu,.reponse5 .bleu").css("height", "10")
                $(".reponse .bleu, .reponse4 .bleu, .reponse2 .bleu,.reponse5 .bleu").css("height", "15")
                $(".reponse2 .bleu").css("width", "65")
                $(".reponse2 .bleu").css("width", "140")
                $(".reponse5 .bleu").css("width", "65")
                $(".reponse5 .bleu").css("width", "160")
                $(".reponse2 .bleu, .reponse .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "65px")
                $(".reponse2 .bleu, .reponse .bleu, .reponse4 .bleu, .reponse5 .bleu").css("margin-left", "15px")

            /// -- ANIME BARRE JAUNE AUTRE -- /// 

                $(".reponse2 .jaune, .reponse .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "89")
                $(".reponse2 .jaune, .reponse .jaune, .reponse4 .jaune, .reponse5 .jaune").css("width", "0")

                $("#titrereponse3").removeClass("bordered");
                $("#img3").css("cursor", "default");

            /// -- ENVOIT DE LA REPONSE -- ///

                htwo.emit("AnswerEvent",    {name: localStorage.streamer,
                                            message: "3"});

                value++;
        }
    });
}

if (elem4 != null && value == 0)
{

    elem4.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $("#titrereponse4").addClass("bordered");
            $("#img4").css("cursor", "pointer");
        }
    });

    elem4.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $("#titrereponse4").removeClass("bordered");
            $("#img4").css("cursor", "default");
        }
    });

    elem4.addEventListener("click", function()
    {
        if (value == 0)
        {
            /// -- Les titres bougent -- /// 

                $("#titrereponse4").css("margin-left", "0px")
                $("#titrereponse4").css("margin-left", "160px")
                $("#titrereponse2").css("margin-left", "0px")
                $("#titrereponse2").css("margin-left", "-90px")
                $("#titrereponse, #titrereponse3").css("margin-left", "0px")
                $("#titrereponse, #titrereponse3").css("margin-left", "-180px")
                $("#titrereponse5").css("margin-left", "0px")
                $("#titrereponse5").css("margin-left", "-70px")

            /// -- ANIME TYPOGRAPHIE -- /// 

                $("#titrereponse2,#titrereponse,#titrereponse3,#titrereponse5").css("font-family", "PROXIMANOVA-BLACK")
                $("#titrereponse2,#titrereponse,#titrereponse3,#titrereponse5").css("font-family", "PROXIMANOVA-LIGHT")

            /// -- ANIME BARRE BLEU SELECTIONNER-- /// 

                $(".reponse4 .bleu").css("width", "66")
                $(".reponse4 .bleu").css("width", "0")

            /// -- ANIME BARRE JAUNE SELECTIONNER -- /// 

                $(".reponse4 .jaune").css("height", "10")
                $(".reponse4 .jaune").css("height", "15")
                $(".reponse4 .jaune").css("width", "66")
                $(".reponse4 .jaune").css("width", "80")
                $(".reponse4 .jaune").css("margin-left", "140px")
                $(".reponse4 .jaune").css("margin-left", "170px")

            /// -- ANIME BARRE BLEU AUTRE-- /// 

                $(".reponse3 .bleu, .reponse .bleu, .reponse2 .bleu,.reponse5 .bleu").css("height", "10")
                $(".reponse3 .bleu, .reponse .bleu, .reponse2 .bleu,.reponse5 .bleu").css("height", "15")
                $(".reponse2 .bleu").css("width", "65")
                $(".reponse2 .bleu").css("width", "140")
                $(".reponse5 .bleu").css("width", "65")
                $(".reponse5 .bleu").css("width", "160")
                $(".reponse2 .bleu, .reponse .bleu, .reponse5 .bleu, .reponse3 .bleu").css("margin-left", "65px")
                $(".reponse2 .bleu, .reponse .bleu, .reponse5 .bleu, .reponse3 .bleu").css("margin-left", "15px")

            /// -- ANIME BARRE JAUNE AUTRE -- /// 

                $(".reponse2 .jaune, .reponse .jaune, .reponse3 .jaune, .reponse5 .jaune").css("width", "89")
                $(".reponse2 .jaune, .reponse .jaune, .reponse3 .jaune, .reponse5 .jaune").css("width", "0")

                $("#titrereponse4").removeClass("bordered");
                $("#img4").css("cursor", "default");

            /// -- ENVOIT DE LA REPONSE -- ///

                htwo.emit("AnswerEvent",    {name: localStorage.streamer,
                                            message: "4"});

                value++;            
        }
    });
}

if (elem5 != null && value == 0)
{

    elem5.addEventListener("mouseover", function() {
        if (value == 0)
        {
            $("#titrereponse5").addClass("bordered");
            $("#img5").css("cursor", "pointer");
        }
    });

    elem5.addEventListener("mouseout", function() {
        if (value == 0)
        {
            $("#titrereponse5").removeClass("bordered");
            $("#img5").css("cursor", "default");
        }
    });

    elem5.addEventListener("click", function()
    {
        if (value == 0)
        {
            /// -- Les titres bougent -- /// 

                $("#titrereponse5").css("margin-left", "0px")
                $("#titrereponse5").css("margin-left", "80px")
                $("#titrereponse2").css("margin-left", "0px")
                $("#titrereponse2").css("margin-left", "-90px")
                $("#titrereponse, #titrereponse4").css("margin-left", "0px")
                $("#titrereponse, #titrereponse4").css("margin-left", "-180px")
                $("#titrereponse3").css("margin-left", "0px")
                $("#titrereponse3").css("margin-left", "-170px")

            /// -- ANIME TYPOGRAPHIE -- /// 

                $("#titrereponse2,#titrereponse,#titrereponse4,#titrereponse3").css("font-family", "PROXIMANOVA-BLACK")
                $("#titrereponse2,#titrereponse,#titrereponse4,#titrereponse3").css("font-family", "PROXIMANOVA-LIGHT")

            /// -- ANIME BARRE BLEU SELECTIONNER-- /// 

                $(".reponse5 .bleu").css("width", "66")
                $(".reponse5 .bleu").css("width", "0")

            /// -- ANIME BARRE JAUNE SELECTIONNER -- /// 

                $(".reponse5 .jaune").css("height", "10")
                $(".reponse5 .jaune").css("height", "15")
                $(".reponse5 .jaune").css("width", "66")
                $(".reponse5 .jaune").css("width", "160")
                $(".reponse5 .jaune").css("margin-left", "140px")
                $(".reponse5 .jaune").css("margin-left", "100px")

            /// -- ANIME BARRE BLEU AUTRE-- /// 

                $(".reponse .bleu, .reponse4 .bleu, .reponse2 .bleu,.reponse3 .bleu").css("height", "10")
                $(".reponse .bleu, .reponse4 .bleu, .reponse2 .bleu,.reponse3 .bleu").css("height", "15")
                $(".reponse2 .bleu").css("width", "65")
                $(".reponse2 .bleu").css("width", "140")
                $(".reponse3 .bleu").css("width", "65")
                $(".reponse3 .bleu").css("width", "65")
                $(".reponse2 .bleu, .reponse .bleu, .reponse4 .bleu, .reponse3 .bleu").css("margin-left", "65px")
                $(".reponse2 .bleu, .reponse .bleu, .reponse4 .bleu, .reponse3 .bleu").css("margin-left", "15px")

            /// -- ANIME BARRE JAUNE AUTRE -- /// 

                $(".reponse2 .jaune, .reponse .jaune, .reponse4 .jaune, .reponse3 .jaune").css("width", "89")
                $(".reponse2 .jaune, .reponse .jaune, .reponse4 .jaune, .reponse3 .jaune").css("width", "0")

                $("#titrereponse5").removeClass("bordered");
                $("#img5").css("cursor", "default");

            /// -- ENVOIT DE LA REPONSE -- ///

                htwo.emit("AnswerEvent",    {name: localStorage.streamer    ,
                                            message: "5"});

                value++;
        }
    });
}