var satoshi = 100000000;

var DELAY_CAP = 1000;

var lastBlockHeight = 0;

/** @constructor */
function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();

	if ('WebSocket' in window) {
		var connection = new ReconnectingWebSocket('ws://ws.blockchain.info/inv');
		TransactionSocket.connection = connection;

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
		};

		connection.onclose = function() {
			console.log('Blockchain.info: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		};

		connection.onerror = function(error) {
			console.log('Blockchain.info: Connection Error: ' + error);
		};

		connection.onmessage = function(e) {
			var data = JSON.parse(e.data);

			// New Transaction
			if (data.op == "utx") {
				var transacted = 0;

				for (var i = 0; i < data.x.out.length; i++) {
					transacted += data.x.out[i].value;
				}

				var bitcoins = transacted / satoshi;
				//console.log("Transaction: " + bitcoins + " BTC");

				var donation = false;
                                var soundDonation = false;
				var outputs = data.x.out;
				for (var j = 0; j < outputs.length; j++) {
					if ((outputs[j].addr) == DONATION_ADDRESS) {
						bitcoins = data.x.out[j].value / satoshi;
						new Transaction(bitcoins, true);
						return;
					}
				}

				setTimeout(function() {
					new Transaction(bitcoins);
				}, Math.random() * DELAY_CAP);

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

		};
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
};

TransactionSocket.close = function() {
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();
	StatusBox.closed("blockchain");
};

/** @constructor */
function TradeSocket() {

}

TradeSocket.init = function() {
	var channel_id = "dbf1dee9-4f2e-4a08-8cb7-748919a71b21"; // Channel id for BTC trades

	// Terminate previous connection, if any
	if (TradeSocket.connection)
		TradeSocket.connection.close();
		
	var connection = PUBNUB.init({
        publish_key   : 'demo',
        subscribe_key : 'sub-c-50d56e1e-2fd9-11e3-a041-02ee2ddab7fe',
		ssl : true
    });
	TradeSocket.connection = connection;
	
	connection.close = function() {
		connection.unsubscribe({channel : channel_id});
		connection.onclose();
	};

	connection.onmessage = function(message) {
		//console.log(message);
			if (message.trade) {
				//console.log("Trade: " + message.trade.amount_int / satoshi + " BTC | " + (message.trade.price * message.trade.amount_int / satoshi) + " " + message.trade.price_currency);
				// 0.57 BTC | 42.75 USD

				var bitcoins = message.trade.amount_int / satoshi;
				var currency = (message.trade.price * message.trade.amount_int / satoshi);
				var currencyName = message.trade.price_currency;
				
				setTimeout(function() {
					new Transaction(bitcoins, false, currency, currencyName);
				}, Math.random() * DELAY_CAP);
			}
	};
	
	connection.onopen = function() {
			console.log('Mt.Gox: Connection open!');
			StatusBox.connected("mtgox");
	};
		
	connection.onclose = function() {
		console.log('Mt.Gox: Connection closed');
		if ($("#mtgoxCheckBox").prop("checked"))
			StatusBox.reconnecting("mtgox");
		else
			StatusBox.closed("mtgox");
	};

	connection.subscribe({
        channel : channel_id,
        message : connection.onmessage,
        connect : connection.onopen,
		disconnect : connection.onclose,
		reconnect : connection.onopen
    });
};

TradeSocket.close = function() {
	if (TradeSocket.connection)
		TradeSocket.connection.close();
	StatusBox.closed("mtgox");
};
