var CONNECTED = "Connected.";
var CONNECTING = "Connecting...";
var NO_SUPPORT = "No browser support.";
var CLOSED = "Click to connect.";

function StatusBox() {

}

StatusBox.init = function(debugmode) {
	this.blockchain = $("#blockchainStatus");
	this.mtgox = $("#mtgoxStatus");

	if (debugmode) {
		this.blockchain.html("");
		this.mtgox.html("Debug mode.")
	}

	if ($("#blockchainCheckBox").prop("checked"))
		StatusBox.reconnecting("blockchain");
	else
		StatusBox.closed("blockchain");

	if ($("#mtgoxCheckBox").prop("checked"))
		StatusBox.reconnecting("mtgox");
	else
		StatusBox.closed("mtgox");
}
// "type" can be either "blockchain" or "mtgox"
StatusBox.connected = function(type) {
	if (type == "blockchain")
		this.blockchain.html('Blockchain.info Transactions: <span style="color: green;">' + CONNECTED + '</span>');
	if (type == "mtgox")
		this.mtgox.html('Mt.Gox Trades: <span style="color: green;">' + CONNECTED + '</span>');
}

StatusBox.reconnecting = function(type) {
	if (type == "blockchain")
		this.blockchain.html('Blockchain.info Transactions: <span style="color: yellow;">' + CONNECTING + '</span>');
	if (type == "mtgox")
		this.mtgox.html('Mt.Gox Trades: <span style="color: yellow;">' + CONNECTING + '</span>');
}

StatusBox.nosupport = function(type) {
	if (type == "blockchain")
		this.blockchain.html('Blockchain.info Transactions: <span style="color: red;">' + NO_SUPPORT + '</span>');
	if (type == "mtgox")
		this.mtgox.html('Mt.Gox Trades: <span style="color: red;">' + NO_SUPPORT + '</span>');
}

StatusBox.closed = function(type) {
	if (type == "blockchain")
		this.blockchain.html('Blockchain.info Transactions: <span style="color: gray;">' + CLOSED + '</span>');
	if (type == "mtgox")
		this.mtgox.html('Mt.Gox Trades: <span style="color: gray;">' + CLOSED + '</span>');
}
