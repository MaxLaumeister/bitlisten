// Set debugmode to true and transactions/trades will be
// randomly generated, and no outside connections will be made.
var DEBUG_MODE = false;

var DONATION_ADDRESS;
var SOUND_DONATION_ADDRESS;

var globalMute = false;

var instanceId = 0;
var pageDivId = "pageDiv";
var TICK_SPEED = 50;

var updateTargets = new Array();

// Preload images
var bubbleImage = new Image();
bubbleImage.src = "images/bubble.png";
var blockImage = new Image();
blockImage.src = "images/block.png";

var debugSpawner;

$(document).ready(function() {
	DONATION_ADDRESS = $("#donationAddress").html();
	// Because the user has javascript running:
	$("#noJavascript").css("display", "none");

	StatusBox.init(DEBUG_MODE);

	$("#clickSuppress").click(function() {
		$("#noInternetExplorer").slideUp(300);
	});

	// Create a bubble spawner for testing
	debugSpawner = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.1) {
			// Try to simulate the transaction spread
			var volume;
			var order = Math.random();
			if (order < .6) {
				volume = Math.random();
			} else if (order < .8) {
				volume = Math.random() * 10;
			} else if (order < .95) {
				volume = Math.random() * 100;
			} else {
				volume = Math.random() * 1000;
			}

			if (Math.random() < 0.5)
				new Transaction(volume, false);
			else
				new Transaction(volume, false, volume * 75, 'USD');
		}
	}
	// Spam the following line into console, it's kind of fun.
	// new Block(228158, 270, 100 * satoshi, 153 * 1024);
});

// Function for handling interface show/hide
var toggleInterface = function() {
	if ($(".interface:hidden").length === 0) {
		$(".interface").fadeOut(500);
		$("#hideInterface").html("[ Show Interface ]");
		$("#hideInterface").css("opacity", "0.5");
	} else {
		$(".interface").fadeIn(500);
		$("#hideInterface").html("[ Hide Interface ]");
		$("#hideInterface").css("opacity", "1");
	}
}

$(window).bind("load", function() {
	if (DEBUG_MODE) {
		setInterval(debugSpawner, 100);
	} else {
		if ($("#blockchainCheckBox").prop("checked"))
			TransactionSocket.init();
		if ($("#mtgoxCheckBox").prop("checked"))
			TradeSocket.init();
	}

	globalUpdate();
	
	Sound.loadup();
	Sound.init();
});

var globalUpdate = function() {
	for (var i = 0; i < updateTargets.length; i++) {
		updateTargets[i].update();
	}
	setTimeout(globalUpdate, TICK_SPEED);
}

window.onbeforeunload = function(e) {
	clearInterval(globalUpdate);
	TransactionSocket.close();
	TradeSocket.close();
};

