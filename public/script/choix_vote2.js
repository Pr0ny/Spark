var elementmap = document.getElementById('overmap')
var elementitems = document.getElementById('overitems')
var elementperso = document.getElementById('overperso')
var elementintero = document.getElementById('overintero')
var ev = 0;

function hideAll()
{
//	$("divE0").hide();
//	$("divE1").hide();
//	$("divE2").hide();
//	$("divE3").hide();
};

elementmap.addEventListener('click', function() {
	if (ev == 0)
	{
//		sendEvent(1, 2)
		ev += 1;
	} else {
		ev -= 1;
	}
});

elementmap.addEventListener('mouseover', function() {
	if (ev == 0)
	{
		$("divE02").toggle();
		$("divE01").toggle();
//		$("#mapimg2").slideToggle('fast');
	}
});

elementmap.addEventListener('mouseout', function() {
	if (ev == 0)
	{
//		hideAll();
		$("divE01").toggle();
		$("divE02").toggle();
//		$("#mapimg").fadeToggle("fast");
	}
});

elementitems.addEventListener('click', function() {
	if (ev == 0)
	{
//		sendEvent(1, 2)
		ev += 1;
	} else {
		ev -= 1;
	}
});

elementitems.addEventListener('mouseover', function() {
	if (ev == 0)
	{
		$("divE12").toggle();
		$("divE11").toggle();
	}
});

elementitems.addEventListener('mouseout', function() {
	if (ev == 0)
	{
		$("divE11").toggle();
		$("divE12").toggle();
	}
});

elementperso.addEventListener('mouseover', function() {
	if (ev == 0)
	{
		$("divE22").toggle();
		$("divE21").toggle();
	}
});

elementperso.addEventListener('click', function() {
	if (ev == 0)
	{
		sendEvent(3, 5);
//		initResult(5);
//		$("#1").html("Top :");
//		$("#2").html("Jgl :");
//		$("#3").html("Mid :");
//		$("#4").html("Adc :");
//		$("#5").html("Supp :");
		ev += 1;
	} else {
		cancelEvent();
		ev -= 1;
	}
});

elementperso.addEventListener('mouseout', function() {
	if (ev == 0)
	{
		$("divE21").toggle();
		$("divE22").toggle();
	}
});

elementintero.addEventListener('mouseover', function() {
	if (ev == 0)
	{
		$("divE32").toggle();
		$("divE31").toggle();
	}
});

elementintero.addEventListener('mouseout', function() {
	if (ev == 0)
	{
		$("divE31").toggle();
		$("divE32").toggle();
	}
});