var config = {
  "reponse" : {
    "nb" : "1",
    "id" : "#titrereponse",
    "class" : ".reponse",
    "margin-left-selected" : "160px",
    "margin-left-not-selected" : "-180px",
    "jaune-class" : ".reponse .jaune",
    "rouge-class" : ".reponse .rouge",
    "jaune" : {
      "width" : "80",
      "margin-left" : "170px"
    },
    "rouge" : {
      "width" : "65",
    }
  },
  "reponse2" : {
    "nb" : "2",
    "id" : "#titrereponse2",
    "class" : ".reponse2",
    "margin-left-selected" : "100px",
    "margin-left-not-selected" : "-90px",
    "jaune-class" : ".reponse2 .jaune",
    "rouge-class" : ".reponse2 .rouge",
    "jaune" : {
      "width" : "150",
      "margin-left" : "120px"
    },
    "rouge" : {
      "width" : "140",
    }
  },
  "reponse3" : {
    "nb" : "3",
    "id" : "#titrereponse3",
    "class" : ".reponse3",
    "margin-left-selected" : "160px",
    "margin-left-not-selected" : "-180px",
    "jaune-class" : ".reponse3 .jaune",
    "rouge-class" : ".reponse3 .rouge",
    "jaune" : {
      "width" : "80",
      "margin-left" : "170px"
    },
    "rouge" : {
      "width" : "65",
    }
  },
  "reponse4" : {
    "nb" : "4",
    "id" : "#titrereponse4",
    "class" : ".reponse4",
    "margin-left-selected" : "160px",
    "margin-left-not-selected" : "-180px",
    "jaune-class" : ".reponse4 .jaune",
    "rouge-class" : ".reponse4 .rouge",
    "jaune" : {
      "width" : "80",
      "margin-left" : "170px"
    },
    "rouge" : {
      "width" : "65",
    }
  },
  "reponse5" : {
    "nb" : "5",
    "id" : "#titrereponse5",
    "class" : ".reponse5",
    "margin-left-selected" : "80px",
    "margin-left-not-selected" : "-70px",
    "jaune-class" : ".reponse5 .jaune",
    "rouge-class" : ".reponse5 .rouge",
    "jaune" : {
      "width" : "160",
      "margin-left" : "100px"
    },
    "rouge" : {
      "width" : "160",
    }
  }
};
var htwo = io.connect("https://spark-esport-dev.cleverapps.io/");
var voted = false;

var select_reponse = function(elem) {
  if (voted) return;
  for (name in config) {
    let rep = config[name];
    if (rep == elem) {
      // Move elem to the right
      $(rep["id"]).css("margin-left", rep["margin-left-selected"]);
      $(rep["id"]).css("font-family", "PROXIMANOVA-BLACK");
      $(rep["jaune-class"]).css("width", rep["jaune"]["width"]);
      $(rep["jaune-class"]).css("margin-left", rep["jaune"]["margin-left"]);
      $(rep["rouge-class"]).css("width", "0");
      console.log("Vote emitted to streamer " + localStorage.streamer);
      htwo.emit("AnswerEvent", {name: localStorage.streamer, message: elem["nb"]});
      voted = true;
    } else {
      // Move elem to the left
      $(rep["id"]).css("margin-left", rep["margin-left-not-selected"]);
      $(rep["id"]).css("font-family", "PROXIMANOVA-LIGHT")
      $(rep["rouge-class"]).css("width", rep["rouge"]["width"]);
      $(rep["rouge-class"]).css("margin-left", "15px");
      $(rep["jaune-class"]).css("width", "0");
    }
  }
}

$(document).ready(function () {
  $(".reponse").click(function () {
    select_reponse(config["reponse"]);
  });
  $(".reponse2").click(function () {
    select_reponse(config["reponse2"]);
  });
  $(".reponse3").click(function () {
    select_reponse(config["reponse3"]);
  });
  $(".reponse4").click(function () {
    select_reponse(config["reponse4"]);
  });
  $(".reponse5").click(function () {
    select_reponse(config["reponse5"]);
  });
});
