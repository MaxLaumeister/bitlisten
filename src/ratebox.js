var rateboxTimeout;
var currentExchange;
var ratebox_ms = 3000; // 3 second update interval
var globalRate = -1; // set upon first rate received

function setGlobalRate(rate) {
    if (globalRate === -1) {
        var checkbox = $("#showDollarCheckBox");
        checkbox.prop("disabled", false);
        checkbox.parent().removeClass("disabled");
    }
    $("#rate").html(parseFloat(rate).toFixed(2));
    globalRate = rate;
}

rateboxGetRate = function() {
	$.getJSON("https://blockchain.info/ticker?cors=true", function(data) {
        setGlobalRate(data.USD.last);
    });
};

$(document).ready(function() {
	// Bitstamp websocket API
    var pusher = new Pusher('de504dc5763aeef9ff52');
    var channel = pusher.subscribe('live_trades');
    channel.bind('trade', function(ticker) {
        setGlobalRate(ticker.price);
        if (rateboxTimeout) clearTimeout(rateboxTimeout);
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
