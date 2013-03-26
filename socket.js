var satoshi = 100000000;

var enableTransactions = true;
var enableTrades = true;

function TransactionSocket() {

}

TransactionSocket.init = function() {
	if ('WebSocket' in window) {
		var connection = new WebSocket('ws://ws.blockchain.info:8335/inv');

		connection.onopen = function() {
			console.log('Blockchain.info: Connection open!');
			var newTransactions = {
				"op" : "unconfirmed_sub"
			};
			connection.send(JSON.stringify(newTransactions));
		}

		connection.onclose = function() {
			console.log('Blockchain.info: Connection closed');
		}

		connection.onerror = function(error) {
			console.log('Blockchain.info: Error detected: ' + error);
		}

		connection.onmessage = function(e) {
			var transaction = JSON.parse(e.data).x;

			var transacted = 0;

			for (var i = 0; i < transaction.out.length; i++) {
				transacted += transaction.out[i].value;
			}

			var bitcoins = transacted / satoshi;
			console.log("Transaction: " + bitcoins + " BTC");

			new Transaction(bitcoins);
		}
	} else {
		//WebSockets are not supported. Try a fallback method like long-polling etc
	}
}
function TradeSocket() {

}

TradeSocket.init = function() {
	// Load Mtgox socket.io library
	$.getScript("https://socketio.mtgox.com/socket.io/socket.io.js", function() {
		// Make connection to Mtgox
		var connection = io.connect('https://socketio.mtgox.com/mtgox');

		connection.on('connect', function() {
			console.log('Mtgox: Connection open!');

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
			console.log('Mtgox: Connection closed');
		});

		connection.on('error', function() {
			console.log('Mtgox: Error detected.');
		});

		connection.on('message', function(message) {
			if (message.trade) {
				console.log("Trade: " + message.trade.amount_int / satoshi + " BTC | " + (message.trade.price * message.trade.amount_int / satoshi) + " " + message.trade.price_currency);
				// 0.57 BTC | 42.75 USD

				var bitcoins = message.trade.amount_int / satoshi;
				var currency = (message.trade.price * message.trade.amount_int / satoshi);
				var currencyName = message.trade.price_currency;

				new Transaction(bitcoins, currency, currencyName);
			}
		});

	});

}
