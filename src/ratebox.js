var rateboxTimeout;
var currentExchange;
var ratebox_ms = 10000; // 10 second update interval
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
    $.ajax({
        dataType: "json",
        cache: false,
        url: "https://api.coinbase.com/v2/prices/BTC-USD/spot",
        success: function(data) {
            setGlobalRate(data.data.amount);
            rateboxTimeout = setTimeout(rateboxGetRate, ratebox_ms);
        }
      });
};

switchExchange = function(exchangeName) {
	clearTimeout(rateboxTimeout);
	currentExchange = exchangeName;
	$("#rate").html("---");
	
	if (exchangeName == "coinbase") {
		$("#coinbaseRate").css("color", "white");
	}
	
	rateboxGetRate();
};
