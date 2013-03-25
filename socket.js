var satoshi = 100000000;

var enableTransactions = false;
var enableTrades = false;

function TransactionSocket() {

}

TransactionSocket.init = function() {
	if ('WebSocket' in window) {
		console.log("Websocket Supported");
		var connection = new WebSocket('ws://ws.blockchain.info:8335/inv');

		connection.onopen = function() {
			console.log('Connection open!');
			var newTransactions = {
				"op" : "unconfirmed_sub"
			};
			connection.send(JSON.stringify(newTransactions));
		}

		connection.onclose = function() {
			console.log('Connection closed');
		}

		connection.onerror = function(error) {
			console.log('Error detected: ' + error);
		}

		connection.onmessage = function(e) {
			var transaction = JSON.parse(e.data).x;

			var transacted = 0;

			for (var i = 0; i < transaction.out.length; i++) {
				transacted += transaction.out[i].value;
			}

			var bitcoins = transacted / satoshi;
			console.log("Transaction of size: " + bitcoins + " BTC");

			new Bubble(bitcoins);
		}
	} else {
		//WebSockets are not supported. Try a fallback method like long-polling etc
	}
}
function TradeSocket() {

}

TradeSocket.init = function() {
	if ('WebSocket' in window) {
		console.log("Websocket Supported");
		var connection = new WebSocket('ws://websocket.mtgox.com/mtgox');

		connection.onopen = function() {
			console.log('Connection open!');
		}

		connection.onclose = function() {
			console.log('Connection closed');
		}

		connection.onerror = function(error) {
			console.log('Error detected: ' + error);
		}

		connection.onmessage = function(e) {
			var message = JSON.parse(e.data);
			if (message.trade) {
				console.log(message);
				console.log((message.trade.price * message.trade.amount) + " " + message.trade.price_currency);
			}
		}
	} else {
		//WebSockets are not supported. Try a fallback method like long-polling etc
	}
}

