var satoshi = 100000000;

var enableTransactions = false;
var enableTrades = true;

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
	var connection = io.connect('https://socketio.mtgox.com/mtgox');

	connection.on('connect', function() {
		console.log('Connection open!');

		// Unsubscribe from depth and ticker
		connection.emit('message', {
			"op" : "unsubscribe",
			"channel" : "24e67e0d-1cad-4cc0-9e7a-f8523ef460fe"
		});
		connection.emit('message', {
			"op" : "unsubscribe",
			"channel" : "d5f06780-30a8-4a48-a2f8-7ed181b4a13f"
		});
	});

	connection.on('disconnect', function() {
		console.log('Connection closed');
	});

	connection.on('error', function() {
		console.log('Error detected.');
	});

	connection.on('message', function(message) {
		if (message.trade) {
			console.log(message);
			console.log((message.trade.price * message.trade.amount).toFixed(2) + " " + message.trade.price_currency);
		}
	});

	/*connection.onmessage = function(e) {

	 }*/

}

