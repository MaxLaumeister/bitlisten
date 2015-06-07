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
		var connection = new ReconnectingWebSocket('wss://bitcoin.toshi.io');
		TransactionSocket.connection = connection;

		StatusBox.reconnecting("blockchain");

		connection.onopen = function() {
			console.log('Toshi.io: Connection open!');
			StatusBox.connected("blockchain");
			var newTransactions = {
				"subscribe" : "transactions"
			};
			var newBlocks = {
				"subscribe" : "blocks"
			};
			connection.send(JSON.stringify(newTransactions));
			connection.send(JSON.stringify(newBlocks));
			connection.send(JSON.stringify({
				"fetch" : "latest_transaction"
			}));
			// Display the latest transaction so the user sees something.
		};

		connection.onclose = function() {
			console.log('Toshi.io: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		};

		connection.onerror = function(error) {
			console.log('Toshi.io: Connection Error: ' + error);
		};

		connection.onmessage = function(e) {
			var response = JSON.parse(e.data);

			// New Transaction
			if (response.subscription == "transactions" || response.fetched == "latest_transaction") {
				var transacted = 0;

				for (var i = 0; i < response.data.outputs.length; i++) {
					transacted += response.data.outputs[i].amount;
				}

				var bitcoins = transacted / satoshi;
				//console.log("Transaction: " + bitcoins + " BTC");

				var donation = false;
                var soundDonation = false;
				var outputs = response.data.outputs;
				for (var j = 0; j < outputs.length; j++) {
					if ((outputs[j].addresses[0]) == DONATION_ADDRESS) {
						bitcoins = response.data.outputs[j].amount / satoshi;
						new Transaction(bitcoins, true);
						return;
					}
				}

				setTimeout(function() {
					new Transaction(bitcoins);
				}, Math.random() * DELAY_CAP);

			} else if (response.subscription == "blocks" || response.fetched == "latest_block") {
				var blockHeight = response.data.height;
				var transactions = response.data.transactions_count;
				var volumeSent = response.data.total_out;
				var blockSize = response.data.size;
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
