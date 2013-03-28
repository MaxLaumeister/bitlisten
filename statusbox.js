var CONNECTED = "Connected.";
var CONNECTING = "Connecting...";
var NO_SUPPORT = "No browser support."

function StatusBox() {
	
}

StatusBox.init = function(debugmode) {
	this.blockchain = $("#blockchainStatus");
	this.mtgox = $("#mtgoxStatus");
	
	if (debugmode) {
		this.blockchain.html("");
		this.mtgox.html("Debug mode.")
	}
}

// "type" can be either "blockchain" or "mtgox"
StatusBox.connected = function(type) {
	if (type == "blockchain") this.blockchain.html('Blockchain.info: <span style="color: green;">' + CONNECTED + '</span>');
	if (type == "mtgox") this.mtgox.html('Mt.Gox: <span style="color: green;">' + CONNECTED + '</span>');
}

StatusBox.reconnecting = function(type) {
	if (type == "blockchain") this.blockchain.html('Blockchain.info: <span style="color: yellow;">' + CONNECTING + '</span>');
	if (type == "mtgox") this.mtgox.html('Mt.Gox: <span style="color: yellow;">' + CONNECTING + '</span>');
}

StatusBox.nosupport = function(type) {
	if (type == "blockchain") this.blockchain.html('Blockchain.info: <span style="color: red;">' + NO_SUPPORT + '</span>');
	if (type == "mtgox") this.mtgox.html('Mt.Gox: <span style="color: red;">' + NO_SUPPORT + '</span>');
}