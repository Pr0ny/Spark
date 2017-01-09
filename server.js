/*  ===================================  *\
|           Designe and code              |
|                  by                     |
|                Mimoone                  |
|                                         |
|       If you can read this code         |
|       please contact me at :            |
|       mimoone.spark@gmail.com           |
|                 test                    |
\*  ===================================  */

/*  ===================================  *\
|                                         |
|              NPM PACKAGE                |
|                                         |
\*  ===================================  */

/* -- Manager of delivery to the clients -- */
var express = require("express");
/* -- Socket to accpet the client and connect Heroku2-- */
var socket = require('socket.io');
/* -- File manager -- */
var fs = require('fs');
/* -- twitch data manager -- */
var _tw = require("./twitch.js");

var pgp = require('pg-promise')();

/*  ===================================  *\
|                                         |
|                  DATABASE               |
|                                         |
\*  ===================================  */

var db = pgp(process.env.POSTGRESQL_ADDON_URI);

/*  ===================================  *\
|                                         |
|              GLOBAL VARIABLE            |
|                                         |
\*  ===================================  */

var app = express();
var pools = {};

var testRoom = "";

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/spark/spark_src'));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + '/spark/spark_src/client.html');
});

app.get("/admin.html", function(req, res)
{
  res.sendFile(__dirname + '/admin.html');
});

app.get("/client.html", function(req, res)
{
  res.sendFile(__dirname + '/spark/spark_src/client.html');
});

app.get(/^(.+)$/, function(req, res)
{
  console.log(req['path']);
  //if (req['path'] == "/admin.html" || req['path'] == "/client.html")
  res.sendFile(__dirname + req.params[0]);
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function()
{
   console.log("Listening on " + port);
});

var io = socket.listen(server);

io.set('origins', '*:*');

adminLog = [];
_dataStreamers = [];

function checkPresence(name) {
  for (var i = 0, len = _dataStreamers.length; i < len; i++)
  {
    if (name == _dataStreamers[i]['sn'])
      return true;
  }
  return false;
}

function getGiveawayTemplate(giveaway, disponibility) {
  var template = "<li AVAILABLE>\
      <img src=\"THUMBNAIL\">\
      <h1>NAME</h1>\
      <img src=\"streamers-html/css/img/inventaire2.png\">\
      <p> PRICE <img src=\"streamers-html/css/img/price.png\"> </p>\
      <h2>DESCRIPTION</h2>\
      <article class=\"runGiveaway\" id=\"ID_GIVEAWAY\">\
          <p> OFFRIR </p>\
      </article>\
  </li>\n";
  if (disponibility == false) {
    template = template.replace("AVAILABLE", "id=\"indisponible\"");
  } else {
    template = template.replace("AVAILABLE", "");
  }
  return template.replace("NAME", giveaway.name).replace("PRICE", giveaway.price).replace("DESCRIPTION", giveaway.description).replace("THUMBNAIL", giveaway.thumbnail).replace("ID_GIVEAWAY", giveaway.id);
}

function checkStreamers() {
  _tw.getTwitchData(_dataStreamers);
}

function getUpdated()
{
  console.log("------------------------");
  _dataStreamers = _tw.getUpdatedData();
}

setInterval(checkStreamers, 10*1000);
setInterval(getUpdated, 10*1000);

var lol = io.sockets.on('connection', function(client)
{
  client.on("streamers", function(data)
  {
    if (data['streamers']) {
      var spl = data['streamers'].split(',');
    } else {
      var spl = [];
    }
    //console.log("streamers" + data['streamers']);
    for (var i = 0, len = spl.length; i < len; i++)
    {
      if (checkPresence(spl[i]) == false)
      {
        console.log("Streamer " + spl[i] + " added.");
        var obj = {
        sn: spl[i],
        ic: 0,
        st: "",
        lg: ""
        };
        _dataStreamers.push(obj);
      }
    }
  });

  client.on("getLive", function(data)
  {
    if (data['streamers'])
    {
      var ret = [];
      //console.log("Le bon debug : " + data['streamers']);
      var spl = data['streamers'].split(',');
      for (var i = 0, len = spl.length; i < len; i++)
      {
        //console.log("getLive = " + spl[i]);
        for (var j = 0, lenn = _dataStreamers.length; j < lenn; j++)
        {
          //console.log("yolo  =  " + _dataStreamers[j]['sn'] + " " + _dataStreamers[j]['ic']);
          if (_dataStreamers[j]['sn'] == spl[i])
          {
            //console.log("added to the data send : " + _dataStreamers[j]['sn'] + " " + _dataStreamers[j]['ic']);
            var obj = {
            sn: spl[i],
            ic: _dataStreamers[j]['ic'],
            st: _dataStreamers[j]['st'],
            lg: _dataStreamers[j]['lg']
            };
            //console.log(">" + obj['sn'] + " " + obj['ic'] +"<");
            ret.push(obj);
          }
        }
      }
      client.emit("setLive", ret);
    }
  });
  /*(function()
  {
    var timeout = setInterval(function()
    {
      _tw.getTwitchData(_dataStreamers);
      //clearInterval(timeout);
    }, 100000);
  })();*/

client.on("whoIsLog", function()
  {
    client.emit("allAdmin", {adminLog: adminLog});
  });

  client.on("AdminLeave", function (data)
    {
      var i = 0;
      while (data['name'] != adminLog[i])
        i++;
      adminLog.splice(i, 1);
      client.emit("refreshLive", {adminLog: adminLog});
    });

  console.log("CONNECTION -> client.id  =  " + client.id);
  client.join(client.id);

  client.on('LoginClient', function(data)
  {
    var code = data['code'];
    var room = data['room'];

    console.log("LoginClient -> code = %d room = %d", code, room);

    client.join(room);
    console.log(client.id  + " has join the room : " + room + "'s room.");
    /*if ((code && room) && (code == 0 || code == -1))
    {
      client.join(room);
      console.log(client.id  + " has join the room : " + room + "'s room.");
    }
    else
    {
      client.join("default");
      console.log(client.id  + " has join the room : default's room.");
    }*/
  });

  client.on('LeaveClient', function(data)
  {
    client.leave(data['room']);
  });

  client.on('UpdateCreditsAdmin', function(data)
  {
    db.one("SELECT * FROM streamers WHERE id = ${name}", {
      name: data['name']
    })
      .then(function(row) {
        io.sockets.in(data['name']).emit("CreditsAmount", {error: "OK",
                                                   code: 0,
                                                   credits: row.credits,
                                                   name: data['name']});
      })
      .catch (function(error) {
        console.log("Error while getting credits amount");
        io.sockets.in(data['name']).emit("CreditsAmount", {error: error,
                                                   code: 1,
                                                   credits: 0,
                                                   name: data['name']});
      });
  });

  client.on('UpdateGiveawaysAdmin', function(data)
  {
    db.one("SELECT * FROM streamers WHERE id = ${name}", {
      name: data['name']
    })
      .then(function(rowStreamer) {
        var listGiveaways = "";
        db.many("SELECT * FROM giveaways")
          .then(function(rows) {
            for (giveaway in rows) {
              listGiveaways += getGiveawayTemplate(rows[giveaway], rows[giveaway].price <= rowStreamer.credits);
            }
            console.log("Nb giveaways : " + rows.length);
            io.sockets.in(data['name']).emit("GiveawaysList", {error: "OK",
                                                       code: 0,
                                                       giveaways: listGiveaways,
                                                       name: data['name']});
          })
          .catch (function(error) {
            console.log("Error while getting giveaways");
            console.log(error);
          });
      })
      .catch (function(error) {
        console.log("Error while getting credits amount to update giveaway list");
        io.sockets.in(data['name']).emit("GiveawaysList", {error: error,
                                                   code: 1,
                                                   html: "",
                                                   name: data['name']});
      });
  });

  client.on('LoginAdmin', function(data)
  {
    db.one("SELECT * FROM streamers WHERE mail=${mail} AND password=${password}", {
      mail: data['mail'],
      password: data['password']
    })
    .then(function(row) {
      var i_link = row.stream_link;
      var name = row.id;
      console.log("Streamer OK : " + row.name);
      var fn = "./public/streamers-html/interface.txt"
      console.log("filename = " + fn);
      fs.readFile(fn, function(err, sf)
      {
        if (err)
        {
          var error = "Server not able to find the file of the streamer"
          var html = "<p top: 10%>Sorry but the server was not able to find the file. Contact Spark team</p>"
          io.sockets.emit("LoginComplete", {error: error,
                                            message: "error",
                                            code: 3,
                                            html: html});
        }
        else
        {
          sf = sf.toString().replace(/STREAMER_NAME/g, row.name);
          sf = sf.replace(/STREAMER_LINK/g, i_link);
          var rowStreamer = row;
          var listGiveaways = "";
          db.many("SELECT * FROM giveaways")
            .then(function(rows) {
              for (giveaway in rows) {
                listGiveaways += getGiveawayTemplate(rows[giveaway], rows[giveaway].price <= rowStreamer.credits);
              }
              console.log("Nb giveaways : " + rows.length);
              sf = sf.replace(/GIVEAWAYS_LIST/g, listGiveaways);
              sf = sf.replace(/CREDITS_AMOUNT/g, rowStreamer.credits)
              var error = "OK";
              console.log("Admin joining the room : " + name);
              adminLog.push(name);
              console.log(adminLog);
              client.join(name);
              io.sockets.in(name).emit("LoginComplete", {error: error,
                                                message: "OK",
                                                code: 1,
                                                html: sf.toString(),
                                                name: name});
              io.sockets.in(name).emit("newStreamer", {name: name});
              io.sockets.emit("loggedAdmin", {error: error,
                                                  message: "OK",
                                                 code: 1,
                                                 name: name});
            })
            .catch (function(error) {
              console.log("Error while getting giveaways");
              console.log(error);
            });
        }
      });
    })
    .catch (function(error) {
      console.log("Wrong mail or password ! :/ mail : "+ data['mail']+ " pass : " + data['password'] );
      console.log("An error as occured while trying to log " + data['mail']);
    });
  });

  client.on('ParticipateEvent', function(data)
  {
    console.log("Id:" + data['id'] + " joined " + data['name'] + " game.");
    pools.name.players.push(data['id']);
  });

  client.on('ThankMessageEventAdmin', function(data)
  {
    var name = data['name'];
    var date = new Date();

    console.log("Le gagnant est " + data['winner_name'] + ". Son mail c'est " + data['winner_mail'] + ".");
    console.log("Son message : " + data['winner_message']);
    db.none("INSERT INTO winners(id, mail, name, message, giveaway, game, participants, date)\
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
       [pools.name.winner.toString(),
        data['winner_mail'].toString(),
        data['winner_name'].toString(),
        data['winner_message'].toString().replace(/"'"/g, "''"),
        pools.name.giveaway.toString(),
        pools.name.game.toString(),
        pools.name.players.length.toString(),
        date.toString()
     ])
      .then(function() {
        console.log("Winner added in DB winners");
      })
      .catch (function(error) {
        console.log("Error while adding a winner " + error);
      });
    io.sockets.in(data['name']).emit("ThankMessageEventAdmin", data);
  });

  client.on('CancelEventAdmin', function(data)
  {
    var name = data['name'];
    var code = data['code'];

    if (code == 0)
    {
      io.sockets.in(name).emit("CancelEventClient", {
                                                      name: name,
                                                      code: code
                                                    });
      io.sockets.in('server').emit("endEvent",  {
                                                  name: name,
                                                  code: code
                                                });
    }
    else
    {
      code = 6;
      console.log("The impossible happened... :[");
      io.sockets.in(name).emit("CancelEventClient", {
                                                    name: name,
                                                    code: code
                                                    });
      io.sockets.in('server').emit("endEvent", {name: name});
    }
  });

  function sendGame(data) {
    var name = data['name'];
    var error = "OK";
    var code = 0;
    var game = data['game'];
    var giveaway = data['giveaway'];

    pools.name.game = game;
    pools.name.giveaway = giveaway;
    console.log("----LANCEMENT DU JEU----")
    if (pools.name.players.length == 0) {
      console.log("No player.");
    } else {
 	    db.none("UPDATE streamers SET credits=credits - (SELECT price FROM giveaways WHERE name=$1) WHERE id=$2", [pools.name.giveaway, name])
        .then(function() {
          console.log("Credits updated");
        })
        .catch (function(error) {
          console.log("Error while updating credits " + error);
        });
      console.log("Game " + game + " started by " + name);
      console.log("You can win : " + giveaway);
      console.log("Participants are " + pools.name.players.toString());
      var id = pools.name.players[Math.floor(Math.random() * pools.name.players.length)];
      console.log("The winner is " + id);
      pools.name.winner = id;
      if (data['code'] == 0)
      {
        html = "<script type=\"text/javascript\" src=\"games/phaser.min.js\"></script><script type=\"text/javascript\" src=\"games/" + game + "/js/game.min.js\"></script>"
        var fn = "./public/viewers-html/winner.txt"
        // TODO: check if files are here
        fs.readFile(fn, function(err, winner)
        {
          var fn = "./public/viewers-html/looser.txt"
          fs.readFile(fn, function(err, looser)
          {
            console.log("Sending event...");
            error = "Sending coresponding event html.";
            data = {
              name: name,
              html: html.toString(),
              winner: winner.toString(),
              id: id,
              looser: looser.toString(),
              error: error,
              code: code.toString()
            };
            //TODO: only participants get the game    room name + "_game"
            io.sockets.in(name).emit("EventClientStart", data);
            io.sockets.in('server').emit('newEvent', data);
            console.log("Event sended. Waiting for responces.");
          });
        });
      }
      else
      {
        code = data['code'];
        html = "<p top: 10%>Look like the streamer have done something wrong...</p>";
        io.sockets.in(name).emit("EventClientStart",{
                                                    name: name,
                                                    html: html.toString(),
                                                    error: error,
                                                    code: code
                                                    });
       }
    }
}

  client.on('EventAdmin', function(data) {sendGame(data)});

  client.on('ParticipateEventAdmin', function(data)
  {
    var name = data['name'];
    var error = "OK";
    var code = 0;
    var giveawayId = data['giveaway'];

    db.one("SELECT * FROM giveaways WHERE id=${id}", {
      id: giveawayId
    })
      .then(function(row) {
        if (data['code'] == 0) {
          pools.name = {};
          pools.name.players = [];
          var fn = "./public/viewers-html/participate.txt"
          fs.readFile(fn, function(err, html)
          {
            html = html.toString().replace(/GIVEAWAY_NAME/g, row.name);
            html = html.replace(/GIVEAWAY_LINK/g, row.thumbnail);
            var sendData = {
              name: name,
              html: html,
              error: error,
              code: code.toString()
            };
            io.sockets.in(name).emit("ParticipateEventClientStart", sendData);
            data.giveaway = row.name;
            data.giveawayImg = row.thumbnail;
            io.sockets.in(name).emit("StartGameEventAdmin", data);
            setTimeout(sendGame, 30000, data);
            console.log("Participate sended.");
          });
        } else {
          code = data['code'];
          html = "<p top: 10%>Look like the streamer have done something wrong...</p>";
          io.sockets.in(name).emit("EventClientStart",{
                                                      name: name,
                                                      html: html.toString(),
                                                      error: error,
                                                      code: code
                                                      });
                                                    }
        })
      .catch (function(error) {
        console.log("Error while getting the name of the giveaway.");
      });
    });

    function generateUUID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    client.on("AddStreamerAdmin", function(data) {
      var id = generateUUID();

      if (data['sparkPassword'] == "thisisspark") {
        db.none("INSERT INTO streamers(id, name, mail, password, credits, stream_link)\
                 VALUES ($1, $2, $3, $4, $5, $6)",
           [data['idname'],
            data['name'].toString(),
            data['mail'].toString(),
            data['password'].toString(),
            0,
            data['link'].toString()
         ])
          .then(function() {
            console.log("Streamer " + data['name'] + " added in DB.");
          })
          .catch (function(error) {
            console.log("Error while adding a streamer : " + error);
          });
      }
    });

    client.on("AddGiveawayAdmin", function(data) {
      var id = generateUUID();

      if (data['password'] == "securitymaster") {
        db.none("INSERT INTO giveaways(id, name, description, price, thumbnail, nbleft)\
                 VALUES ($1, $2, $3, $4, $5, $6)",
           [id,
            data['name'].toString(),
            data['description'].toString(),
            data['price'].toString(),
            data['thumbnail'].toString(),
            data['number'].toString()
         ])
          .then(function() {
            console.log("Giveaway " + data['name'] + " added in DB.");
          })
          .catch (function(error) {
            console.log("Error while adding a giveaway : " + error);
          });
      }
    });
});
