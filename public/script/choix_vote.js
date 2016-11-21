var elementporo = document.getElementById('overporo')
var elementvoies = document.getElementById('overvoies')
var elementworld = document.getElementById('overworld')
var elementashe = document.getElementById('overashe')
var afficher = false;
var ev = 0;

function hideAll()
{
/*	$("div1").hide();
	$("div2").hide();
	$("div3").hide();
	$("div4").hide();
	$("div5").hide();
	$("#ask").hide();*/
}

elementworld.addEventListener('mouseover', function() {
	if(ev == 0)
	{
		hideAll();
		$("#ask").attr("src", "./image/EXPORTTEXTE/WORLD-TEXT.png");;
		div2show();
	}
});

elementworld.addEventListener('click', function() {
	if (ev == 0)
	{
		sendEvent(2, 2);
		selectdiv2('#worldimg');
		ev += 1;
	}
	else
	{
		cancelEvent();
		deselectdiv2('#worldimg');
		ev -= 1;
	}
});

elementworld.addEventListener('mouseout', function() {
	if(ev == 0)
	{
		div2hide();
	}
});

elementvoies.addEventListener('mouseover', function() {
	if (ev == 0)
	{
		hideAll();
		div3show();
	}
});

elementvoies.addEventListener('click', function() {
	if (ev == 0)
	{
		sendEvent(3, 5);
		selectdiv3('#voiesimg');
		ev += 1;
	}
	else
	{
		cancelEvent();
		deselectdiv3('#voiesimg');
		ev -= 1;
	}
});

elementvoies.addEventListener('mouseout', function() {
	if (ev == 0)
	{
		div3hide();
	}
});

elementporo.addEventListener('mouseover', function() {
	if(ev == 0)
	{
		hideAll();
		div1show();
	}
});

elementporo.addEventListener('click', function() {
	if (ev == 0)
	{
		sendEvent(1, 2);
		selectdiv1('#poroimg');
		ev += 1;
	}
	else
	{
		cancelEvent();
		deselectdiv1('#poroimg');
		ev -= 1;
	}
});

elementporo.addEventListener('mouseout', function() {
	if(ev == 0)
	{
		div1hide();
	}
});

elementashe.addEventListener('mouseover', function() {
	if(ev == 0)
	{
		hideAll();
		//$("#ask").attr("src", "./image/EXPORTTEXTE/Ashe-TEXT.png");
		//$("#ask").fadeIn("slow");
		div4show();
	}
});

elementashe.addEventListener('click', function() {
	if (ev == 0)
	{
		sendEvent(4, 4);
		selectdiv4('#asheimg');
		ev += 1;
	}
	else
	{
		cancelEvent();
		deselectdiv4('#asheimg');
		ev -= 1;
	}
});

elementashe.addEventListener('mouseout', function() {
	if(ev == 0)
	{
		div4hide();
	}
});

function deselectdiv1(id)
{
	$(id).attr("src", "./img/spark/icon/map_blanc.png");
}

function deselectdiv2(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/World.png");
}

function deselectdiv3(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/Voies.png");
}

function deselectdiv4(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/Ashe.png");
}

function deselectdiv5(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/Nexus.png");
}

function div1show()
{
	$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 
	$(document).ready(function()
	{
		//$("#askporo").show();
		$("#div1E").slideFadeToggle("slow");
		//$("#askporo").delay(300).fadeToggle("slow");
	});
}

function selectdiv1(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/PoroB.png");
}

function div1hide()
{
	$(document).ready(function() {
		$("#divE1").hide();
		$("#askporo").hide();
	});
}

function div2show()
{
	$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 
	$(document).ready(function() {
		$("#div2").show();
		$("#askworld").show();
	});
}

function selectdiv2(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/WorldB.png");
}

function div2hide()
{
	$(document).ready(function() {
		$("#div2").hide();
		$("#askworld").hide();
	});
}

function div4show()
{
	$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 
	$(document).ready(function() {
		$("#div4").show();
		$("#askashe").show();
	});
}

function selectdiv4(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/AsheB.png");
}

function div4hide()
{
	$(document).ready(function() {
		$("#div4").hide();
		$("#askashe").hide();
	});
}

function div3show()
{
	$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 
	$(document).ready(function() {
		$("#div3").show();
		$("#askvoies").show();
	});
}

function selectdiv3(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/VoiesB.png");
}

function div3hide()
{
	$(document).ready(function() {
		$("#div3").hide();
		$("#askvoies").hide();
	});
}

function div5show()
{
	$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 
	$(document).ready(function() {
		$("#div5").show();
		$("#asknexus").show();
	});
}

function selectdiv5(id)
{
	$(id).attr("src", "./image/EXPORTQUESTION/NexusB.png");
}

function div5hide()
{
	$(document).ready(function() {
		$("#div5").hide();
		$("#asknexus").hide();
	});
}