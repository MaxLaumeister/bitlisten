var instanceId = 0;
var pageDivId = "pageDiv";

var pageWidth;
var pageHeight;

var nodes = new Array();

var onDocumentLoad = function() {
	pageWidth = window.innerWidth;
	pageHeight = window.innerHeight;
	
	//var bubble = new Bubble();
	//var bubble2 = new Bubble();
	
	// Create a bubble spawner for testing
	var spawnBubble = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.01) {
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
	
	Sound.init();
	
	if (enableTransactions) TransactionSocket.init();
	else setInterval(spawnBubble, 30);
	
	if (enableTrades) TradeSocket.init();
}