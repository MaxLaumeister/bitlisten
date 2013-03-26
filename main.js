// Set debugmode to true and transactions/trades will be 
// randomly generated, and no outside connections will be made.
var debugmode = true;

var instanceId = 0;
var pageDivId = "pageDiv";

var pageWidth;
var pageHeight;

var nodes = new Array();

var onDocumentLoad = function() {
	pageWidth = window.innerWidth;
	pageHeight = window.innerHeight;
	
	// Create a bubble spawner for testing
	var debugSpawner = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.04) {
			// Try to simulate the transaction spread
			var volume;
			var order = Math.random();
			if (order < .6) {
				volume = Math.random();
			} else if (order < .8 ) {
				volume = Math.random() * 10;
			} else if (order < .95) {
				volume = Math.random() * 100;
			} else {
				volume = Math.random() * 1000;
			}
			
			if (Math.random() < 0.5) new Transaction(volume);
			else new Transaction(volume, volume * 75, 'USD');
		}
	}
	
	if (debugmode) {
		setInterval(debugSpawner, 100);
	} else {
		TransactionSocket.init();
		TradeSocket.init();
	}
	
	Sound.init();
	StatusBox.init(debugmode);
}

