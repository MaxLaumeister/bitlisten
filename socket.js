var satoshi=100000000;

function Socket() {

}

Socket.init = function() {
	if ('WebSocket' in window) {
		console.log("Websocket Supported");
		var connection = new WebSocket('ws://ws.blockchain.info:8335/inv');

		connection.onopen = function() {
			console.log('Connection open!');
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
		var newTransactions = {
			"op" : "unconfirmed_sub"
		};

		//connection.close();

	} else {
		//WebSockets are not supported. Try a fallback method like long-polling etc
	}
}
	
/*
} {"op":"utx","x":{"hash":"728513317b96485fe3f016f83f2840327f653b6c82fe6cbbd7ec7c54f242437c","vin_sz":1,"vout_sz":1,"lock_time":"Unavailable","size":224,"relayed_by":"83.172.107.194","tx_index":62678163,"time":1364198839,"inputs":[{"prev_out":{"value":2000000,"type":0,"addr":"1LbPBV9gKrUuCFdHefzaQJqwFNtPG4a1EJ"}}],"out":[{
		"value" : 2000000,
		"type" : 0,
		"addr" : "1BLeYMhoEQtRojwzpfHo5Dv6vYLZcHsq3K"
	}]
}} */