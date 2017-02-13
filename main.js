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
|					Just a basic main...					  |
 \                                                           /
  \*=======================================================*/

  /*=======================================================*\
 /                                                           \
|                         NPM PACKAGE                         |
 \                                                           /
  \*=======================================================*/

//Package to handle all the HTTP requests
var http = require("./server.js");
//Package to handle all the socket request
var sock = require("./socket.js");

  /*=======================================================*\
 /                                                           \
|                         Public Function                     |
 \                                                           /
  \*=======================================================*/

//Package to handle redis request
//var _redis = require("./redis.js");

http.create();
http.launch();

sock.create(http.getServer());
sock.launch();

//_redis.create("redis://:SKRcq2h5SOfTejSdqVu@b3px8ei2m-redis.services.clever-cloud.com:3045");
//_redis.launch();
console.log("Server is now launched.");



