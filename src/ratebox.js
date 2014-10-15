var rateboxTimeout;
var currentExchange;
var ratebox_ms = 3000; // 3 second update interval

rateboxGetRate = function() {
	if (currentExchange == "bitstamp") {
		// Thanks to nyg for this trick - https://github.com/nyg/bitstamp-ticker/blob/master/bitstamp.js
		var api_url = 'https://www.bitstamp.net/api/ticker/';
		var yql_url = '//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D"' + api_url + '"&format=json&callback=?';
		
        $.getJSON(yql_url, function (jsonp) {
          var ticker = $.parseJSON(jsonp.query.results.body.p);
          if (ticker) {
            $("#rate").html(parseFloat(ticker.last).toFixed(2));
          } else {
            rateboxTimeout = setTimeout(rateboxGetRate, ratebox_ms);
          }
        });
      
	} else {
		throw "Unrecognized Exchange";
	}
};

$(document).ready(function() {
	// Bitstamp websocket API
	var pusher = new Pusher('de504dc5763aeef9ff52');
	var channel = pusher.subscribe('live_trades');
	channel.bind('trade', function(ticker) {
        $("#rate").html(parseFloat(ticker.price).toFixed(2));
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
