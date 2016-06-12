var CONNECTED = "Connected.";
var CONNECTING = "Connecting...";
var NO_SUPPORT = "No browser support.";
var CLOSED = "Click to connect.";

var provider_name = "blockchain.info";

function StatusBox() {

}

StatusBox.init = function(debugmode) {
	StatusBox.blockchain = $("#blockchainStatus");
	StatusBox.mtgox = $("#mtgoxStatus");

	if (debugmode) {
		StatusBox.blockchain.html("");
		StatusBox.mtgox.html("Debug mode.");
	}

	if ($("#blockchainCheckBox").is(":checked"))
		StatusBox.reconnecting("blockchain");
	else
		StatusBox.closed("blockchain");

	if ($("#mtgoxCheckBox").is(":checked"))
		StatusBox.reconnecting("mtgox");
	else
		StatusBox.closed("mtgox");
};
// "type" can be either "blockchain" or "mtgox"
StatusBox.connected = function(type) {
	if (type == "blockchain")
		StatusBox.blockchain.html('Transactions (' + provider_name + '): <span style="color: green;">' + CONNECTED + '</span>');
	if (type == "mtgox")
		StatusBox.mtgox.html('Mt.Gox Trades: <span style="color: green;">' + CONNECTED + '</span>');
};

StatusBox.reconnecting = function(type) {
	if (type == "blockchain")
		StatusBox.blockchain.html('Transactions (' + provider_name + '): <span style="color: yellow;">' + CONNECTING + '</span>');
	if (type == "mtgox")
		StatusBox.mtgox.html('Mt.Gox Trades: <span style="color: yellow;">' + CONNECTING + '</span>');
};

StatusBox.nosupport = function(type) {
	if (type == "blockchain")
		StatusBox.blockchain.html('Transactions (' + provider_name + '): <span style="color: red;">' + NO_SUPPORT + '</span>');
	if (type == "mtgox")
		StatusBox.mtgox.html('Mt.Gox Trades: <span style="color: red;">' + NO_SUPPORT + '</span>');
};

StatusBox.closed = function(type) {
	if (type == "blockchain")
		StatusBox.blockchain.html('Transactions (' + provider_name + '): <span style="color: gray;">' + CLOSED + '</span>');
	if (type == "mtgox")
		StatusBox.mtgox.html('Mt.Gox Trades: <span style="color: gray;">' + CLOSED + '</span>');
};
