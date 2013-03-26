function StatusBox() {
	
}

StatusBox.init = function(debugmode) {
	this.blockchain = $("#blockchainStatus");
	this.mtgox = $("#mtgoxStatus");
	
	if (debugmode) {
		this.blockchain.html("Debug mode.");
		this.mtgox.html("Debug mode.")
	}
}

// "type" can be either "blockchain" or "mtgox"
StatusBox.connected = function(type) {
	if (type == "blockchain") this.blockchain.html('Blockchain.info: <span style="color: green">Connected.</span>');
	if (type == "mtgox") this.mtgox.html('Mt.Gox: <span style="color: green">Connected.</span>');
}

StatusBox.reconnecting = function(type) {
	if (type == "blockchain") this.blockchain.html('Blockchain.info: <span style="color: yellow">Reconnecting.</span>');
	if (type == "mtgox") this.mtgox.html('Mt.Gox: <span style="color: yellow">Reconnecting.</span>');
}
