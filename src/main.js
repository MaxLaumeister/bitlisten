// Set debugmode to true and transactions/trades will be
// randomly generated, and no outside connections will be made.
var DEBUG_MODE = false;

var DONATION_ADDRESS;
var SOUND_DONATION_ADDRESS;

var globalMute = false;

var instanceId = 0;
var pageDivId = "pageDiv";

var last_update = 0;

var updateTargets = [];

// Preload images
var bubbleImage = new Image();
bubbleImage.src = "images/bubble.png";
var blockImage = new Image();
blockImage.src = "images/block.png";

var debugSpawner;

var updateLayoutWidth = function() {
	$(".chartMask").css("visibility", "visible");
};

var updateLayoutHeight = function() {
	var newHeight = window.innerHeight;
	if ($("#header").css("display") != "none") newHeight -= $("#header").outerHeight();
	$("#pageSplitter").height(newHeight);
};

$(document).ready(function() {

	prevChartWidth = $("#pageSplitter").width() / 2;
	
	$("#chartCell").hide();
	
	DONATION_ADDRESS = $("#donationAddress").html();
	// Because the user has javascript running:
	$("#noJavascript").css("display", "none");

	// Initialize draggable vertical page splitter
	updateLayoutHeight();
	
	StatusBox.init(DEBUG_MODE);

	$(".clickSuppress").click(function() {
		$(".clickSuppress").parent().slideUp(300);
	});

	// Create a bubble spawner for testing
	debugSpawner = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.1) {
			// Try to simulate the transaction spread
			var volume;
			var order = Math.random();
			if (order < 0.6) {
				volume = Math.random();
			} else if (order < 0.8) {
				volume = Math.random() * 10;
			} else if (order < 0.95) {
				volume = Math.random() * 100;
			} else {
				volume = Math.random() * 1000;
			}

			if (Math.random() < 0.5)
				new Transaction(volume, false);
			else
				new Transaction(volume, false, volume * 75, 'USD');
		}
	};
	// Spam the following line into console, it's kind of fun.
	// new Block(228158, 270, 100 * satoshi, 153 * 1024);
	
	switchExchange("bitstamp");
	
	// Attach mouseover qr
	$("#donationAddress").qr();
	
});

// Function for handling interface show/hide
var toggleInterface = function() {
	if ($(".interface:hidden").length === 0) {
		$(".interface").fadeOut(500, updateLayoutHeight);
		$("#hideInterface").html("[ Show Interface ]");
		$("#hideInterface").css("opacity", "0.5");
	} else {
		$(".interface").fadeIn(500);
		$("#hideInterface").html("[ Hide Interface ]");
		$("#hideInterface").css("opacity", "1");
		updateLayoutHeight();
	}
};

var globalUpdate = function(time) {
	window.requestAnimationFrame(globalUpdate);
	var delta = time - last_update;
	last_update = time;
	for (var i = 0; i < updateTargets.length; i++) {
		updateTargets[i].update(delta);
	}
};

$(window).bind("load", function() {
	if (DEBUG_MODE) {
		setInterval(debugSpawner, 100);
	} else {
		if ($("#blockchainCheckBox").prop("checked"))
			TransactionSocket.init();
		if ($("#mtgoxCheckBox").prop("checked"))
			TradeSocket.init();
	}

	window.requestAnimationFrame(globalUpdate);
	
	Sound.loadup();
	Sound.init();
});

var endResize = function() {
    $(".chartMask").css("visibility", "hidden");
	for (var i = 0; i < updateTargets.length; i++) {
		updateTargets[i].updateContainerSize();
	}
};

var hideChart = function() {
	$("#chartElement").hide();
	$("#showChart").show();
	prevChartWidth = $("#chartCell").width();
	$("#chartCell").width(0);
	$("#chartCell").hide();
	$("#pageSplitter").colResizable({
		disable: true
	});
};

var showChart = function() {
	$("#chartElement").show();
	$("#showChart").hide();
	$("#chartCell").width(prevChartWidth);
	$("#chartCell").show();
	$(window).trigger("resize");
	if ($("#bitcoinChart").length === 0) {
		// Load the iframe
		$("#chartHolder").html('<iframe id="bitcoinChart" scrolling="no" frameBorder="0" src="http://bitcoin.clarkmoody.com/widget/chart/zeroblock/"></iframe>');
	}
	$("#pageSplitter").colResizable({
		liveDrag: true,
		onDrag: updateLayoutWidth,
		onResize: endResize
	});
};

$(window).resize(function() {
    updateLayoutHeight();
});

window.onbeforeunload = function(e) {
	clearInterval(globalUpdate);
	TransactionSocket.close();
	TradeSocket.close();
};

