/*  ===================================  *\
|           Designe and code              |
|                  by                     |
|                Mimoone                  |
|                                         |
|       If you can read this code         |
|       please contact me at :            |
|       mimoone.spark@gmail.com           |
|                                         |
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

/*  ===================================  *\
|                                         |
|              GLOBAL VARIABLE            |
|                                         |
\*  ===================================  */

var app = express();

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

function checkPresence(name)
{
  for (var i = 0, len = _dataStreamers.length; i < len; i++)
  {
    if (name == _dataStreamers[i]['sn'])
      return true;
  }
  return false;
}

function checkStreamers()
{
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
    var spl = data['streamers'].split(',');
    //console.log("streamers" + data['streamers']);
    for (var i = 0, len = spl.length; i < len; i++)
    {
      if (checkPresence(spl[i]) == false)
      {
        console.log("Streamer " + spl[i] + " added.");
        var obj = {
        sn: spl[i],
        ic: 0,
        st: ""
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
        console.log("getLive = " + spl[i]);
        for (var j = 0, lenn = _dataStreamers.length; j < lenn; j++)
        {
          //console.log("yolo  =  " + _dataStreamers[j]['sn'] + " " + _dataStreamers[j]['ic']);
          if (_dataStreamers[j]['sn'] == spl[i])
          {
            //console.log("added to the data send : " + _dataStreamers[j]['sn'] + " " + _dataStreamers[j]['ic']);
            var obj = {
            sn: spl[i],
            ic: _dataStreamers[j]['ic'],
            st: _dataStreamers[j]['st']
            };
            console.log(">" + obj['sn'] + " " + obj['ic'] +"<");
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
    if ((code && room) && (code == 0 || code == -1))
    {
      client.join(room);
    }
    else
    {
      client.join("default");
    }
  	console.log(client.id  + " has join the room : " + room + "'s room.");
  });

  client.on('LeaveClient', function(data)
  {
    client.leave(data['room']);
  });

  client.on('LoginAdmin', function(data)
  {
    var login = data['login'];

    fs.readFile('./streamers.db',function(err, txt)
    {
      if (err)
      {
        var error = "Database not found. Cannot read the file on the server."
        var html = "<p top: 10%>Sorry but the database is broken. We're currently working on it.</p>"
        io.sockets.emit("LoginComplete", {error: error,
                                          message: "error",
                                          code: 2,
                                          html: html});
      }
      else
      {
        txt = txt.toString();

        var db = txt.split("\n");

        db.forEach(function(item)
        {
          var number = item.split(":")[1];
          
          if (number == login)
          {
            var name = item.split(":")[0];
            var fn = "./public/streamers-html/" + name + "/" + name +".txt"

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
              }
            });
          }
        });
      }
    });
  });

  client.on('LoginServer', function(data)
  {
    client.join('server');

    console.log("Heroku2 is connected");
  });

  client.on('AwnserEvent', function(data)
  {
    console.log("Réponse pour " + data['name']);
    io.sockets.in(data['name']).emit("AwnserEvent", data);
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

  client.on('EventAdmin', function(data)
  {
    var name = data['name'];
    var fn = data['fn'];
    var file = "./public/streamers-html/" + fn + ".txt";
    var error = "OK";
    var code = 0;

    console.log("name = " + name);
    console.log("Trying to read : " + file);
    if (data['code'] == 0)
    {
      fs.readFile(file ,function(err, html)
      {
        //console.log(html.toString());
        if (err)
        {
          file = "./public/streamers-html/error.txt";
          fs.readFile(file ,function(err, errHtml)
          {
            if (err)
            {
              console.log("Error code 5");
              error = "Cannot find the default error file.";
              html = "<p top: 10%>Look like the server is kind of broken</p>";
              code = 5;
            }
            html = errHtml;
          });
        }
        else
        {
          console.log("Sending event...");
          error = "Sending coresponding event html.";
          code = 0;
        }
        data = {
                                                    name: name,
                                                    html: html.toString(),
                                                    error: error,
                                                    code: code
                                                    };
        io.sockets.in(name).emit("EventClientStart", data);
        io.sockets.in('server').emit('newEvent', data);
        console.log("Event sended. Waiting for responces.");
      });
    }
    else
    {
      code = data['code'];
      html = "<p top: 10%>Look like th streamer have done something wrong...</p>";
      io.sockets.in(name).emit("EventClientStart",{
                                                  name: name,
                                                  html: html.toString(),
                                                  error: error,
                                                  code: code
                                                  });
    }
  });

});
