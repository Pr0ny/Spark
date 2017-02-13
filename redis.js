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
|				handle redis request safely ;)			      |
 \                                                           /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         NPM PACKAGE                         |
 \                                                           /
  \*=======================================================*/

//Package to handle redis request
var _redis = require('redis');
//Package to sync async
var _dea = require('deasync')

/*=======================================================*\
/                                                           \
|                         Private variable                    |
\                                                           /
\*=======================================================*/

//Private value used to contact the redis database
var _redisURL;

  /*=======================================================*\
 /                                                           \
|                         Private Function                    |
 \                                                           /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         Public Function                     |
 \                                                           /
  \*=======================================================*/

exports.create = function (redisURL) {
    //if (redisURL && redisURL.length == 75) {
    _redisURL = redisURL;
    //} else {
        //console.log("ERROR - Invalide redis url.");
    //}
}

exports.launch = function () {
    _client = _redis.createClient(_redisURL);
    console.log("OK - Redis database initialized.");
}

exports.verify = function (key) {
    var bool;
    if (key != undefined) {
        _client.hget("Streamer", key, function (err, replies) {
            if (err == null && replies == null)
                bool = false;
            else
                bool = true;
        });
    } else {
        bool = false;
    }
    while (bool === undefined) {
        _dea.runLoopOnce();
    }
    return (bool);
}

exports.add = function (key) {
    if (key != undefined)
        _client.hmset("Streamer", key, JSON.stringify({}));
    return;
}

exports.get = function (key) {
    var data;

    if (key != undefined) {
        _client.hget("Streamer", key, function (err, replies) {
            if (err == null && replies != null)
                data = replies;
            else
                data = "";
        });
    }
    while (data === undefined) {
        _dea.runLoopOnce();
    }
    return (data);
}