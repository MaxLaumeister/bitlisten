var satoshi = 100000000;

var lastBlockHeight = 0;

function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (this.connection)
		this.connection.close();

	if ('WebSocket' in window) {
		var connection = new ReconnectingWebSocket('ws://ws.blockchain.info:8335/inv');
		this.connection = connection;

		StatusBox.reconnecting("blockchain");

		connection.onopen = function() {
			console.log('Blockchain.info: Connection open!');
			StatusBox.connected("blockchain");
			var newTransactions = {
				"op" : "unconfirmed_sub"
			};
			var newBlocks = {
				"op" : "blocks_sub"
			};
			connection.send(JSON.stringify(newTransactions));
			connection.send(JSON.stringify(newBlocks));
			connection.send(JSON.stringify({
				"op" : "ping_tx"
			}));
			// Display the latest transaction so the user sees something.
		}

		connection.onclose = function() {
			console.log('Blockchain.info: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		}

		connection.onerror = function(error) {
			console.log('Blockchain.info: Connection Error: ' + error);
		}

		connection.onmessage = function(e) {
			var data = JSON.parse(e.data);

			// New Transaction
			if (data.op == "utx") {
				var transacted = 0;

				for (var i = 0; i < data.x.out.length; i++) {
					transacted += data.x.out[i].value;
				}

				var bitcoins = transacted / satoshi;
				console.log("Transaction: " + bitcoins + " BTC");

				var donation = false;
				var outputs = data.x.out;
				for (var i = 0; i < outputs.length; i++) {
					if ((outputs[i].addr) == DONATION_ADDRESS) {
						bitcoins = data.x.out[i].value / satoshi;
						new Transaction(bitcoins, true);
						return;
					}
				}

				new Transaction(bitcoins);
			} else if (data.op == "block") {
				var blockHeight = data.x.height;
				var transactions = data.x.nTx;
				var volumeSent = data.x.estimatedBTCSent;
				var blockSize = data.x.size;
				// Filter out the orphaned blocks.
				if (blockHeight > lastBlockHeight) {
					lastBlockHeight = blockHeight;
					console.log("New Block");
					new Block(blockHeight, transactions, volumeSent, blockSize);
				}
			}

		}
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
}

TransactionSocket.close = function() {
	if (this.connection)
		this.connection.close();
	StatusBox.closed("blockchain");
}
function TradeSocket() {

}

TradeSocket.init = function() {
	// Terminate previous connection, if any
	if (this.connection)
		this.connection.disconnect();

	// Load Mtgox socket.io library
	var self = this;
	StatusBox.reconnecting("mtgox");

	$.getScript("https://socketio.mtgox.com/socket.io/socket.io.js", function() {
		// Make connection to Mtgox
		var connection = io.connect('https://socketio.mtgox.com/mtgox');
		self.connection = connection;
		console.log("Opening Mtgox connection.");

		connection.on('connect', function() {
			console.log('Mtgox: Connection open!');
			StatusBox.connected("mtgox");

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
			if ($("#mtgoxCheckBox").prop("checked"))
				StatusBox.reconnecting("mtgox");
			else
				StatusBox.closed("mtgox");
		});

		connection.on('error', function() {
			console.log('Mtgox: Connection error.');
		});

		connection.on('message', function(message) {
			if (message.trade) {
				console.log("Trade: " + message.trade.amount_int / satoshi + " BTC | " + (message.trade.price * message.trade.amount_int / satoshi) + " " + message.trade.price_currency);
				// 0.57 BTC | 42.75 USD

				var bitcoins = message.trade.amount_int / satoshi;
				var currency = (message.trade.price * message.trade.amount_int / satoshi);
				var currencyName = message.trade.price_currency;

				new Transaction(bitcoins, false, currency, currencyName);
			}
		});

	});

}

TradeSocket.close = function() {
	if (this.connection)
		this.connection.disconnect();
	StatusBox.closed("mtgox");
}

