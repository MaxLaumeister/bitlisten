var instanceId = 0;
var pageDivId = "pageDiv";

var pageWidth;
var pageHeight;

var nodes = new Array();

var globalUpdate = function() {

}
var onDocumentLoad = function() {
	pageWidth = window.innerWidth;
	pageHeight = window.innerHeight;
	
	//var bubble = new Bubble();
	//var bubble2 = new Bubble();
	
	// Create a bubble spawner for testing
	var spawnBubble = function() {
		// Generate some test bubbles
		if (Math.random() <= 0.05) {
			var ball = new Bubble();
		}
	}
	setInterval(spawnBubble, 30);
}
