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
/* -- Package to request data from twitch -- */
var _request = require('request');
/*  ===================================  *\
|                                         |
|              GLOBAL VARIABLE            |
|                                         |
\*  ===================================  */

/* -- Declaration of Cliend ID for Twitch -- */
var _cId = "6nnocorvcohcm17dc9ikkt507udnqlo";
/* -- Declaration of base URI for the multiple request -- */
var _baseUri = "https://api.twitch.tv/kraken/streams/";

var _dataStreamer = [];
var _save = [];

/*  ===================================  *\
|                                         |
|             TWITCH REQUEST              |
|                                         |
\*  ===================================  */

function checkPresence(name)
{
  for (var i = 0, len = _dataStreamers.length; i < len; i++)
  {
    if (name == _dataStreamers[i]['sn'])
      return true;
  }
  return false;
}

function requestTwitch(name, i)
{
  console.log("RequestTwitch => " + name);
	var uri = _baseUri + name;
  var ret;
	var data = _request({
	    headers: {
			'Client-ID': _cId,
      'Content-Type': 'application/json'
    	},
	    uri: uri,
    	method: 'GET'
  	},
  	function (err, res, body)
  	{
      if (body.substring(1, 14) == "\"stream\":null")
      {
        //console.log(name + " is offline");
        var obj = {
          sn: name,
          ic: 0,
          st: ""
        };
        _dataStreamer.push(obj);
      }
      else
      {
        //console.log(name + " is online");
        var nba = body.indexOf("\"status\":\"") + 10;
        var nbb = body.indexOf("\",\"broadcaster");
        var sub = body.substring(nba, nbb);
        //console.log("nba = " + nba + " nbb = " + nbb + " |  sub = " + sub);
        var obj = {
          sn: name,
          ic: 1,
          st: sub
        };
        if (checkPresence(name) == false)
          _dataStreamer.push(obj);
      }
  	});
}

/*  ===================================  *\
|                                         |
|            PUBLIC FUNCTIONS             |
|                                         |
\*  ===================================  */


module.exports = {

	getTwitchData: function(data)
	{
    _save = _dataStreamer;
    _dataStreamer = [];
    for (var i = 0, len = data.length; i < len; i++)
    {
      requestTwitch(data[i]['sn'], i);
    }
  },

  getUpdatedData: function()
  {
    for (var i = 0, len = _dataStreamer.length; i < len; i++)
    {
      console.log("getUpdateData => name = " + _dataStreamer[i]['sn'] + " => " + _dataStreamer[i]['ic']);
    }
    return (_save);
  }
};