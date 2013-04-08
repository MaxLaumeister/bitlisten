var globalVolume = 100;
var globalScalePitch;
var bankNumber = 0;
var bankNote;
var globalBank;

function Sound() {

}

var soundBank = [];
	// the second number is the number of sound files available
	soundBank[0] = ["celesta", 22];
	soundBank[1] = ["celestaA", 2];
	soundBank[2] = ["celestaB", 1];
	


Sound.loadup = function(bankNumber){
	
	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	var newSound;
	var istring;
	
	// soundBank[x], for transactions and trades
	currentSound = new Array();
	for (var i = 1; i <= soundBank[bankNumber][1]; i++) {
		istring = zeroPad(i, 3);
		newSound = new buzz.sound("sounds/"+ soundBank[bankNumber][0] +"/"+ soundBank[bankNumber][0] + istring, {
			formats : ["ogg", "mp3"]
		});
		currentSound.push(newSound);
		newSound.load();
	}
	globalBank = currentSound;
	
	// String swells, for blocks
	this.swells = new Array();
	for (var i = 1; i <= 3; i++) {
		newSound = new buzz.sound("sounds/swells/swell" + i, {
			formats : ["ogg", "mp3"]
		});
		this.swells.push(newSound);
		newSound.load();
	}
}



Sound.init = function() {

	var currentSound = globalBank;

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
	
	$("#selectaSlider").noUiSlider({
		range : [0, 2],
		start : 0,
		handles : 1,
		step : 1,
		orientation : "horizontal",
		slide : function() {
			bankNumber = $(this).val();
			$('#selectaNumber').text(soundBank[bankNumber][0]);
			Sound.loadup(bankNumber);
			Sound.init;
		}
	});
	
	globalScalePitch = $("#scalePitchCheckBox").attr("checked");
		console.log("globalscalepitch loaded");
}
var currentNotes = 0;
var noteTimeout = 200;
var currentSound = globalBank;

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
	var index = Math.floor(pitch / 100.0 * currentSound.length);
	//console.log("Pitch: " + pitch);
	
	// Here we fuzz the index a bit to prevent the same sound
	// from being heard over and over again, which gets annoying
	var fuzz = Math.floor(Math.random() * 4) - 2;
	index += fuzz
	index = Math.min(currentSound.length - 1, index);
	index = Math.max(0, index);
	
	//console.log("Fuzz: " + fuzz);
	//console.log("Index: " + index);
	

	var readyState = currentSound[index].get("readyState");
	if (readyState >= 2 && currentNotes < 5) {
		currentSound[index].stop().setVolume(volume * (globalVolume / 100)).play();
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