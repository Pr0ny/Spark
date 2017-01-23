		var socketio = io.connect("/");
		var _streamerName = "";

		// Login related
		function login() {
			var pseudo = $('#pseudo').val();
			var login = $('#pass').val();
			socketio.emit("LoginAdmin", {
				mail: pseudo,
				password: login
			});
			console.log("Login send to the server. Waiting for response...");
		}

		socketio.on("LoginFailed", function(data) {
			if ($('#wrongPass').css("display") != "none") {
				$('#wrongPass').toggle("fast");
			}
			$('wrongPass').effect('shake', 100);
		});

		socketio.on("LoginComplete", function(data) {
			console.log("Response recieved from the server. code = " + data['code']);

			if (data['code'] != 1) {
				console.log("A problem has occured. Waiting for details");
				errorHandler(data);
			} else {
				var html = data['html'];
				var name = data['name'];

				_streamerName = name;
				$("#choiceEvent").html(html);
				console.log("Login completed. Nice to see you " + name + ".\n");
			}
		});

		var timeLeft;

		socketio.on("CreditsAmount", function(data) {
			if (data['code'] == 0) {
				$('#credits').html(data['credits']);
			} else {
				console.log("CreditsAmount error : " + data['error']);
			}
		});

		socketio.on("GiveawaysList", function(data) {
			if (data['code'] == 0) {
				$('.cadeaux_jeux_charge').html(data['giveaways']);
			} else {
				console.log("GiveawaysList error : " + data['error']);
			}
		});

		socketio.on("ThankMessageEventAdmin", function(data) {
			$('#winnerName').html(data['winner_name']);
			$('#winnerMessage').html(data['winner_message']);
			timeLeft = 0;
		});

		socketio.on('StartGameEventAdmin', function(data) {
			$('#giveawayName').html(data['giveaway']);
			$('#giveawayImg').css("background-image", 'url(' + data['giveawayImg'] + ')');
			$('#gameName').html(data['game'].toUpperCase());

			timeLeft = 180;
			var elem = document.getElementById('timerGame');
			var timerId = setInterval(countdown, 1000);

	    function countdown() {
	      if (timeLeft <= 0) {
					elem.innerHTML = "Terminé";
	        clearTimeout(timerId);
	      } else {
	        elem.innerHTML = timeLeft + ' secondes';
	        timeLeft--;
	      }
	    }
		});

		// Event related
		function sendEvent(num, nbv) {
			var code;

			if (num && nbv)
				code = 0;
			else if (!num || !nbv) {
				code = 4;
			}
			console.log("Event lancé !");
			socketio.emit("EventAdmin", {
				name: _streamerName,
				fn: num,
				code: code
			});
			initResult(nbv);
		}

		function cancelEvent() {
			console.log("je cancel");
			var code = 0;
			socketio.emit("CancelEventAdmin", {
				name: _streamerName,
				code: code
			});
			clearResult();
		}

		function errorHandler(data) {
			var code = data['code'];
			var desc = data['error'];
			var html = data['html'];

			console.log("An error has occured. If you want to know more about this contact mimoone.spark@gmail.com\nDetails :\n");
			if (code > 1 && code <= 10) {
				console.log("CODE :  " + code + "\n");
				console.log("DESCRIPTION : " + desc + "\n");
				if (html)
					$("#choiceEvent").html(html);
				else {
					$("#choiceEvent").html("<p top: 10%>No html has been given</p>");
				}
				$('#login').toggle("slow");
				$('#choiceEvent').toggle("slow");
			}
		}

		window.onbeforeunload = closingCode;

		function closingCode() {
			socketio.emit("AdminLeave", {
				name: _streamerName
			});
		}