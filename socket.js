  /*=======================================================*\
 /                                                           \
|    ___________________    _____   __________  ____  __.     |
|   /   _____/\______   \  /  _  \  \______   \|    |/ _|     |
|   \_____  \  |     ___/ /  /_\  \  |       _/|      <       |
|   /        \ |    |    /    |    \ |    |   \|    |  \      |
|  /_______  / |____|    \____|__  / |____|_  /|____|__ \     |
|          \/                    \/         \/         \/     |
 \                 mimoone.spark@gmail.com                   /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         Purpose                             |
|					Handle all socket request   			  |
 \                                                           /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         NPM PACKAGE                         |
 \                                                           /
  \*=======================================================*/

//Package to handle socket request and connections
var socket = require('socket.io');
//Package to handle safely request on the postgreSQL
var pgp = require('pg-promise')();
//Package to handle safely request on the Redis database
var _redis = require("./redis.js");

  /*=======================================================*\
 /                                                           \
|                         Private variable                    |
 \                                                           /
  \*=======================================================*/

var io;
var db = pgp(process.env.POSTGRESQL_ADDON_URI);

  /*=======================================================*\
 /                                                           \
|                         Public Function                     |
 \                                                           /
  \*=======================================================*/

exports.create = function (server) {
    io = socket.listen(server);
    io.set('origins', '*:*');
    _redis.create(process.env.REDIS_URL);
    _redis.launch();
}

exports.launch = function () {

    io.sockets.on('connection', function (client) {

        client.on("streamers", function (data) {
            var spl;
            if (data['streamers']) {
                spl = data['streamers'].split(',');
            } else {
                spl = [];
            }
            for (var i = 0, len = spl.length; i < len; i++) {
                if (_redis.verify(spl[i]) == false) {
                    _redis.add(spl[i]);
                    //Put in database the streamer with ""
                    //console.log("Streamer " + spl[i] + " added.");
                }
            }
            spl = null;
        });

        client.on("getLive", function (data) {
            var ret;
            var spl;
            var obj;
            var da;
            if (data['streamers'])
            {
                ret = [];
                spl = data['streamers'].split(',');
                for (var i = 0, len = spl.length; i < len; i++) {
                    da = _redis.get(spl[i]);
                    if (da != undefined && da != "") {
                        da = JSON.parse(da);
                        obj = {
                            sn: spl[i],
                            ic: da.status,
                            st: da.title,
                            lg: da.logo
                        };
                    } else {
                        obj = {
                            sn: spl[i],
                            ic: "",
                            st: "",
                            lg: ""
                        };
                    }
                    ret.push(obj);
                }
                client.emit("setLive", ret);
            }
            ret = undefined;
            spl = undefined;

        });

        client.on("whoIsLog", function () {
            client.emit("allAdmin", { adminLog: adminLog });
        });

        client.on("AdminLeave", function (data) {
            var i = 0;
            while (data['name'] != adminLog[i])
                i++;
            adminLog.splice(i, 1);
            client.emit("refreshLive", { adminLog: adminLog });
            i = null;
        });

        client.join(client.id);

        client.on('LoginClient', function (data) {
            var code = null;
            var room = null;

            var code = data['code'];
            var room = data['room'];
            console.log("LoginClient -> code = %d room = %d", code, room);

            client.join(room);
            console.log(client.id + " has join the room : " + room + "'s room.");
            code = null;
            room = null;
        });

        client.on('LeaveClient', function (data) {
            client.leave(data['room']);
        });

        client.on('UpdateCreditsAdmin', function (data) {
            db.one("SELECT * FROM streamers WHERE id = ${name}", {
                name: data['name']
            })
                .then(function (row) {
                    io.sockets.in(data['name']).emit("CreditsAmount", {
                        error: "OK",
                        code: 0,
                        credits: row.credits,
                        name: data['name']
                    });
                })
                .catch(function (error) {
                    console.log("Error while getting credits amount");
                    io.sockets.in(data['name']).emit("CreditsAmount", {
                        error: error,
                        code: 1,
                        credits: 0,
                        name: data['name']
                    });
                });
        });

        client.on('UpdateGiveawaysAdmin', function (data) {
            db.one("SELECT * FROM streamers WHERE id = ${name}", {
                name: data['name']
            })
                .then(function (rowStreamer) {
                    var listGiveaways = "";
                    db.many("SELECT * FROM giveaways")
                        .then(function (rows) {
                            for (giveaway in rows) {
                                listGiveaways += getGiveawayTemplate(rows[giveaway], rows[giveaway].price <= rowStreamer.credits);
                            }
                            console.log("Nb giveaways : " + rows.length);
                            io.sockets.in(data['name']).emit("GiveawaysList", {
                                error: "OK",
                                code: 0,
                                giveaways: listGiveaways,
                                name: data['name']
                            });
                        })
                        .catch(function (error) {
                            console.log("Error while getting giveaways");
                            console.log(error);
                        });
                    listGiveaways = null;
                })
                .catch(function (error) {
                    console.log("Error while getting credits amount to update giveaway list");
                    io.sockets.in(data['name']).emit("GiveawaysList", {
                        error: error,
                        code: 1,
                        html: "",
                        name: data['name']
                    });
                });
        });

        client.on('LoginAdmin', function (data) {
            db.one("SELECT * FROM streamers WHERE mail=${mail} AND password=${password}", {
                mail: data['mail'],
                password: data['password']
            })
                .then(function (row) {
                    var i_link = row.stream_link;
                    var name = row.id;
                    console.log("Streamer OK : " + row.name);
                    var fn = "./public/streamers-html/interface.txt"
                    console.log("filename = " + fn);
                    fs.readFile(fn, function (err, sf) {
                        if (err) {
                            var error = "Server not able to find the file of the streamer"
                            var html = "<p top: 10%>Sorry but the server was not able to find the file. Contact Spark team</p>"

                            error = "Server not able to find the file of the streamer"
                            html = "<p top: 10%>Sorry but the server was not able to find the file. Contact Spark team</p>"
                            io.sockets.emit("LoginComplete", {
                                error: error,
                                message: "error",
                                code: 3,
                                html: html
                            });
                            error = null;
                            html = null;
                        }
                        else {
                            sf = sf.toString().replace(/STREAMER_NAME/g, row.name);
                            sf = sf.replace(/STREAMER_LINK/g, i_link);
                            var rowStreamer = row;
                            var listGiveaways = "";
                            db.many("SELECT * FROM giveaways")
                                .then(function (rows) {
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
                                    io.sockets.in(name).emit("LoginComplete", {
                                        error: error,
                                        message: "OK",
                                        code: 1,
                                        html: sf.toString(),
                                        name: name
                                    });
                                    io.sockets.in(name).emit("newStreamer", { name: name });
                                    io.sockets.emit("loggedAdmin", {
                                        error: error,
                                        message: "OK",
                                        code: 1,
                                        name: name
                                    });
                                    error = null;
                                })
                                .catch(function (error) {
                                    console.log("Error while getting giveaways");
                                    console.log(error);
                                });
                        }
                    });
                    i_link = null;
                    name = null;
                    fn = null;
                })
                .catch(function (error) {
                    console.log("Wrong mail or password ! :/ mail : " + data['mail'] + " pass : " + data['password']);
                    console.log("An error as occured while trying to log " + data['mail']);
                });
        });

        client.on('ParticipateEvent', function (data) {
            console.log("Id:" + data['id'] + " joined " + data['name'] + " game.");
            pools.name.players.push(data['id']);
        });

        client.on('ThankMessageEventAdmin', function (data) {
            var name;
            var date;

            name = data['name'];
            date = new Date();
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
                .then(function () {
                    console.log("Winner added in DB winners");
                })
                .catch(function (error) {
                    console.log("Error while adding a winner " + error);
                });
            io.sockets.in(data['name']).emit("ThankMessageEventAdmin", data);
            name = null;
            date = null;
        });

        client.on('CancelEventAdmin', function (data) {
            var name;
            var code;

            var name = data['name'];
            var code = data['code'];
            if (code == 0) {
                io.sockets.in(name).emit("CancelEventClient", {
                    name: name,
                    code: code
                });
                io.sockets.in('server').emit("endEvent", {
                    name: name,
                    code: code
                });
            }
            else {
                code = 6;
                console.log("The impossible happened... :[");
                io.sockets.in(name).emit("CancelEventClient", {
                    name: name,
                    code: code
                });
                io.sockets.in('server').emit("endEvent", { name: name });
            }
            name = null;
            code = null;
        });

        function sendGame(data) {
            var name;
            var error;
            var code;
            var game;
            var giveaway;

            name = data['name'];
            error = "OK";
            code = 0;
            game = data['game'];
            giveaway = data['giveaway'];
            pools.name.game = game;
            pools.name.giveaway = giveaway;
            console.log("----LANCEMENT DU JEU----")
            if (pools.name.players.length == 0) {
                console.log("No player.");
            } else {
                db.none("UPDATE streamers SET credits=credits - (SELECT price FROM giveaways WHERE name=$1) WHERE id=$2", [pools.name.giveaway, name])
                    .then(function () {
                        console.log("Credits updated");
                    })
                    .catch(function (error) {
                        console.log("Error while updating credits " + error);
                    });
                console.log("Game " + game + " started by " + name);
                console.log("You can win : " + giveaway);
                console.log("Participants are " + pools.name.players.toString());
                var id = pools.name.players[Math.floor(Math.random() * pools.name.players.length)];
                console.log("The winner is " + id);
                pools.name.winner = id;
                id = null;
                if (data['code'] == 0) {
                    html = "<script type=\"text/javascript\" src=\"games/phaser.min.js\"></script><script type=\"text/javascript\" src=\"games/" + game + "/js/game.min.js\"></script>"
                    var fn = "./public/viewers-html/winner.txt"
                    // TODO: check if files are here
                    fs.readFile(fn, function (err, winner) {
                        var fn = "./public/viewers-html/looser.txt"
                        fs.readFile(fn, function (err, looser) {
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
                else {
                    code = data['code'];
                    html = "<p top: 10%>Look like the streamer have done something wrong...</p>";
                    io.sockets.in(name).emit("EventClientStart", {
                        name: name,
                        html: html.toString(),
                        error: error,
                        code: code
                    });
                }
            }
            name = null;
            error = null;
            code = null;
            game = null;
            giveaway = null;
        }

        client.on('EventAdmin', function (data) { sendGame(data) });

        client.on('ParticipateEventAdmin', function (data) {
            var name;
            var error;
            var code;
            var giveawayId;

            name = data['name'];
            error = "OK";
            code = 0;
            giveawayId = data['giveaway'];
            db.one("SELECT * FROM giveaways WHERE id=${id}", {
                id: giveawayId
            })
                .then(function (row) {
                    if (data['code'] == 0) {
                        pools.name = {};
                        pools.name.players = [];
                        var fn = "./public/viewers-html/participate.txt"
                        fs.readFile(fn, function (err, html) {
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
                            sendData = null;
                        });
                    } else {
                        code = data['code'];
                        html = "<p top: 10%>Look like the streamer have done something wrong...</p>";
                        io.sockets.in(name).emit("EventClientStart", {
                            name: name,
                            html: html.toString(),
                            error: error,
                            code: code
                        });
                    }
                    fn = null;
                })
                .catch(function (error) {
                    console.log("Error while getting the name of the giveaway.");
                });
            name = null;
            error = null;
            code = null;
            giveawayId = null;
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

        client.on("AddStreamerAdmin", function (data) {
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
                    .then(function () {
                        console.log("Streamer " + data['name'] + " added in DB.");
                    })
                    .catch(function (error) {
                        console.log("Error while adding a streamer : " + error);
                    });
            }
            id = null;
        });

        client.on("AddGiveawayAdmin", function (data) {
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
                    .then(function () {
                        console.log("Giveaway " + data['name'] + " added in DB.");
                    })
                    .catch(function (error) {
                        console.log("Error while adding a giveaway : " + error);
                    });
            }
            id = null;
        });
    });
    console.log("soket opened !");
}








