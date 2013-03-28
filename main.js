// Set debugmode to true and transactions/trades will be
// randomly generated, and no outside connections will be made.
var DEBUG_MODE = false;

var globalMute = false;

var instanceId = 0;
var pageDivId = "pageDiv";

var updateTargets = new Array();

$(document).ready(function() {
	// Because the user has javascript running:
	$("#noJavascript").css("display", "none");
	$("#blockchainStatus").html('Blockchain.info: <span style="color: yellow;">Initializing.</span>');
	$("#mtgoxStatus").html('Mt.Gox: <span style="color: yellow;">Initializing.</span>');
	
	$("#clickSuppress").click(function () {
      $("#noInternetExplorer").slideUp(300);
    });
	
	// Create a bubble spawner for testing
	var debugSpawner = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.04) {
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
				new Transaction(volume);
			else
				new Transaction(volume, volume * 75, 'USD');
		}
	}

	Sound.init();
	StatusBox.init(DEBUG_MODE);

	if (DEBUG_MODE) {
		setInterval(debugSpawner, 100);
	} else {
		TransactionSocket.init();
		TradeSocket.init();
	}

	globalUpdate();

	//new Block(228158, 270, 100 * satoshi, 153 * 1024);
});

var globalUpdate = function() {
	for (var i = 0; i < updateTargets.length; i++) {
		updateTargets[i].update();
	}
	setTimeout(globalUpdate, 40);
}

window.onbeforeunload = function(e) {
	clearInterval(globalUpdate);
	TransactionSocket.close();
	TradeSocket.close();
};

