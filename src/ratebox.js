var rateboxTimeout;
var currentExchange;
var ratebox_ms = 3000; // 3 second update interval
var globalRate = 1100; // standard set to 1100

rateboxGetRate = function() {
	// After some testing, the YQL proxy turns out not to be very reliable.
	// Instead of that, we will just wait for the BitStamp websocket to update.
};

$(document).ready(function() {
	// Bitstamp websocket API
	var pusher = new Pusher('de504dc5763aeef9ff52');
	var channel = pusher.subscribe('live_trades');
	channel.bind('trade', function(ticker) {
        $("#rate").html(parseFloat(ticker.price).toFixed(2));
        if (rateboxTimeout) clearTimeout(rateboxTimeout);
        globalRate = parseFloat(ticker.price).toFixed(2);
	});
});

switchExchange = function(exchangeName) {
	clearTimeout(rateboxTimeout);
	currentExchange = exchangeName;
	$("#rate").html("---");
	
	if (exchangeName == "bitstamp") {
		$("#bitstampRate").css("color", "white");
		$("#mtgoxRate").css("color", "gray");
	} else if (exchangeName == "mtgox") {
		$("#mtgoxRate").css("color", "white");
		$("#bitstampRate").css("color", "gray");
	}
	
	rateboxGetRate();
};
