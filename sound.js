var globalVolume = 100;
var globalScalePitch = true;

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

	$("#volumeSlider").noUiSlider({
		range : [0, 100],
		start : 0,
		handles : 1,
		step : 1,
		orientation : "vertical",
		slide : function() {
			globalVolume = 100 - $(this).val();
		}
	});

}
var currentNotes = 0;
var noteTimeout = 200;

Sound.playRandomAtVolume = function(volume) {
	if (globalMute)
		return;
		
	var randomPitch = Math.floor(Math.random() * 100);
	this.playPitchAtVolume(volume, randomPitch);
}

Sound.playPitchAtVolume = function(volume, pitch) {
	if (globalMute)
		return;
	
	// Find the index corresponding to the requested pitch
	var index = Math.floor(pitch / 100.0 * this.celesta.length);
	//console.log("Pitch: " + pitch);
	
	// Here we fuzz the index a bit to prevent the same sound
	// from being heard over and over again, which gets annoying
	var fuzz = Math.floor(Math.random() * 4) - 2;
	index += fuzz
	index = Math.min(this.celesta.length - 1, index);
	index = Math.max(0, index);
	
	//console.log("Fuzz: " + fuzz);
	//console.log("Index: " + index);
	

	var readyState = this.celesta[index].get("readyState");
	if (readyState >= 2 && currentNotes < 5) {
		this.celesta[index].stop().setVolume(volume * (globalVolume / 100)).play();
		currentNotes++;
		setTimeout(function() {
			currentNotes--;
		}, noteTimeout);
	}
}

var lastBlockSound = -1;
Sound.playRandomSwell = function() {
	if (globalMute)
		return;

	var randomIndex;
	do {
		randomIndex = Math.floor(Math.random() * this.swells.length);
		console.log("New Number");
	} while (randomIndex == lastBlockSound);

	lastBlockSound = randomIndex;

	var readyState = this.swells[randomIndex].get("readyState");
	if (readyState >= 2)
		this.swells[randomIndex].stop().setVolume(globalVolume).play();
}