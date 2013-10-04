var video = false;
var RATIO = 640.0/390.0;

function getvid(url) {
	if (!url.match(/.*youtube.com\/watch\?v=[\w\d]{11}.+/)) return url;
	else {
		return url.match(/\?v=([\w\d]+)&?/)[1];
	}
}

function go_forth(id) {
	var li = "http://www.youtube.com/v/" + id + "?version=3&controls=0&hd=1&autoplay=1&autoplay=1?enablejsapi=1";
	$("#player").attr("src", li);
	function complete() { 
		$("#player").fadeIn(1600);
		video = true;		
	}
	$("#info").fadeOut(450, complete);
	$(".footer").fadeOut(450);
}

function change_url(id) {
	var u = window.location.href.split("?v=");
	u = u[0];
	if (id) u += "?v=" + id;
	window.location.href = u;
}

$(document).ready(function () {
	
	// get sizing out of the way
	$("#player").css("width", 0.9*$(window).width());
	$("#player").css("height", 0.9*$(window).width() / RATIO);

	$(window).resize(function () {
		var $p = $("#player");
		$p.css("width", 0.9*$(window).width());
		$p.css("height", 0.9*$(window).width() / RATIO);

		if( (screen.availHeight || screen.height-30) <= window.innerHeight) {
    		// hacky fullscreen check
    		$p.addClass("fullscreen");
    		$p.css("width", $(window).width());
    		$p.css("height", $(window).height());
    		$("#hotzone").hide();
		} else {
			$p.removeClass("fullscreen");
			if (video) {
				$("#hotzone").show();
			}
		}
	});


	var url = window.location.href.match(/\?v=([\w\d]+)/);
	if (url && url.length > 1) {
		go_forth(url[1]);
	}

	$("#inp").on("input", function () {
		var input = $(this).val();
		if (input.length != 11	&& !input.match(/.*youtube.com\/watch\?v=[\w\d]{11}.+/)) {
			$("#err").addClass("error")
		} else $("#err").removeClass("error");
	});

	$('#inp').bind("enterKey",function(e){
	   	var li = $("#inp").val();
	   	change_url();
		change_url(getvid(li));
		go_forth(getvid(li));
	});
	$('#inp').keyup(function(e){
	    if(e.keyCode == 13)
	    {
	        $(this).trigger("enterKey");
	    }
	});

	$("#container").on("mouseover", function () {
		if (video) {
			$("#return").fadeIn(200);
		}
	});
	$("#container").on("mouseleave", function () {
		$("#return").fadeOut(300);
	});

});