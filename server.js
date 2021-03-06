﻿  /*=======================================================*\
 /                                                           \
|    ___________________    _____   __________  ____  __.     |
|   /   _____/\______   \  /  _  \  \______   \|    |/ _|     |
|   \_____  \  |     ___/ /  /_\  \  |       _/|      <       |
|   /        \ |    |    /    |    \ |    |   \|    |  \      |
|  /_______  / |____|    \____|__  / |____|_  /|____|__ \     |
|          \/                    \/         \/         \/     |
 \                 matthieu.lambert@epitech.eu               /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         Purpose                             |
|               This module is here to handle safely          |
|               any http request. If there is no module       |
|               on the server it will crash                   |
|                                                             |
 \                                                           /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         NPM PACKAGE                         |
 \                                                           /
  \*=======================================================*/

//Package requiered to handle http requests
var http = require('http');

//Manager of delivery to the clients
var express = require("express");

  /*=======================================================*\
 /                                                           \
|                         Private variable                    |
 \                                                           /
  \*=======================================================*/

//local variable to store the initialization of the server
var server = null;

//express to serve path
var app = express();

//port where the server is supposed to listen
var PORT = process.env.PORT || 8080;

  /*=======================================================*\
 /                                                           \
|                         Public Function                     |
 \                                                           /
  \*=======================================================*/

//Create a server
exports.create = function () {
    server = app.listen(PORT, function () {
        console.log("Listening on " + PORT);
    });
}

exports.launch = function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/spark/spark_src'));

    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/spark/spark_src/client.html');
    });

    app.get("/admin.html", function (req, res) {
        res.sendFile(__dirname + '/admin.html');
    });

    app.get("/client.html", function (req, res) {
        res.sendFile(__dirname + '/spark/spark_src/client.html');
    });

    app.get(/^(.+)$/, function (req, res) {
        if (req['path'].split('/').length >= 2)
            res.sendFile(__dirname + req.params[0]);
    });
}

exports.getServer = function () {
    return (server);
}


