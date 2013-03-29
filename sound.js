function Sound() {

}

Sound.init = function() {

	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	var newSound;
	var istring;

	// Celesta, for transactions and trades
	this.celesta = new Array();
	for (var i = 1; i <= 22; i++) {
		istring = zeroPad(i, 3);
		newSound = new buzz.sound("sounds/celesta/c" + istring, {
			formats : ["ogg", "mp3"]
		});
		this.celesta.push(newSound);
		newSound.load();
	}

	// String swells, for blocks
	this.swells = new Array();
	for (var i = 1; i <= 3; i++) {
		newSound = new buzz.sound("sounds/swells/swell" + i, {
			formats : ["ogg", "mp3"]
		});
		this.swells.push(newSound);
		newSound.load();
	}

	// Initialize sound toggle button
	$("#volumeControl").click(function() {
		if (!globalMute) {
			globalMute = true;
			buzz.all().stop();
			$("#volumeControl").css("background-position", "0 0");
		} else {
			globalMute = false;
			$("#volumeControl").css("background-position", "0 -46px");
		}
	});
}
var currentNotes = 0;
var noteTimeout = 200;

Sound.playRandomAtVolume = function(volume) {
	if (globalMute)
		return;
	var randomIndex = Math.floor(Math.random() * this.celesta.length);

	var readyState = this.celesta[randomIndex].get("readyState");
	if (readyState >= 2 && currentNotes < 5) {
		this.celesta[randomIndex].stop().setVolume(volume).play();
		currentNotes++;
		setTimeout(function() {
			currentNotes--;
		}, noteTimeout);
	}
}

Sound.playRandomSwell = function() {
	if (globalMute)
		return;
	var randomIndex = Math.floor(Math.random() * this.swells.length);

	var readyState = this.swells[randomIndex].get("readyState");
	if (readyState >= 2)
		this.swells[randomIndex].stop().play();
}

