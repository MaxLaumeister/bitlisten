var globalVolume = 50;
var globalScalePitch;
var bankNumber = 0;
var bankNote;
var globalBank;

//init volume at 50%
Howler.volume (globalVolume*.01);

function Sound() {

}

var soundBank = [];
	// the second number is the number of sound files available
	soundBank[0] = ["celesta", 22];
	soundBank[1] = ["planet", 33];
	soundBank[2] = ["wikki", 13];
	


Sound.loadup = function(){
	
	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	var newSound;
	var istring;
	
	// sound0 = celesta
	sound0 = new Array(); 
        for (var i = 1; i <= 22; i++) {
                istring = zeroPad(i, 3);
                newSound = new Howl({
                        urls: ["sounds/celesta/" + "celesta" + istring + ".ogg",
                               "sounds/celesta/" + "celesta" + istring + ".mp3"],
                        autoplay: false
                });
                sound0.push(newSound);
                newSound.load();
        }
        
        // sound1 = planet
	sound1 = new Array(); 
        for (var i = 1; i <= 33; i++) {
                istring = zeroPad(i, 3);
                newSound = new Howl({
                        urls: ["sounds/planet/" + "planet" + istring + ".ogg",
                               "sounds/planet/" + "planet" + istring + ".mp3"],
                        autoplay: false
                });
                sound1.push(newSound);
                newSound.load();
        }
        
         // sound2 = celestaB
	sound2 = new Array(); 
        for (var i = 1; i <= 13; i++) {
                istring = zeroPad(i, 3);
                newSound = new Howl({
                        urls: ["sounds/wikki/" + "wikki" + istring + ".ogg",
                               "sounds/wikki/" + "wikki" + istring + ".mp3"],
                        autoplay: false
                });
                sound2.push(newSound);
                newSound.load();
        }
	//globalBank = currentSound;
	
	// String swells0, for blocks
	swells0 = new Array();
	for (var i = 1; i <= 3; i++) {
		newSound = new Howl({
			urls: ["sounds/swells0/swell" + i +".ogg",
				    "sounds/swells0/swell" + i +".mp3"],
			autoplay: false
		});
		newSound.load();
		swells0.push(newSound);
	}
        
        // String swells1, for blocks
	swells1 = new Array();
	for (var i = 1; i <= 3; i++) {
		newSound = new Howl({
			urls: ["sounds/swells1/planetswell" + i +".ogg",
				    "sounds/swells1/planetswell" + i +".mp3"],
			autoplay: false
		});
		newSound.load();
		swells1.push(newSound);
	}
        
        // String swells2, for blocks
	swells2 = new Array();
	for (var i = 1; i <= 3; i++) {
		newSound = new Howl({
			urls: ["sounds/swells2/wikkiswell" + i +".ogg",
				    "sounds/swells2/wikkiswell" + i +".mp3"],
			autoplay: false
		});
		newSound.load();
		swells2.push(newSound);
	}
        
        currentSound = sound0;
        currentSwells = swells0;
        donationSound = new Howl({
            urls: ["sounds/donation/thanks.ogg","sounds/donation/thanks.mp3"],
            autoplay: false
        });
        
}



Sound.init = function() {


	// Initialize sound toggle button
	$("#volumeControl").click(function() {
		if (!globalMute) {
			globalMute = true;
			Howler.mute();
			$("#volumeControl").css("background-position", "0 0");
		} else {
			globalMute = false;
			Howler.unmute();
			$("#volumeControl").css("background-position", "0 -46px");
		}
	});
        
	$("#volumeSlider").noUiSlider({
		range : [0, 100],
		start : 50,
		handles : 1,
		step : 1,
		orientation : "vertical",
		slide : function() {
			globalVolume = 100 - $(this).val();
			Howler.volume (globalVolume*.01);
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
                        if (bankNumber == 0 )
                            {currentSound = sound0;
                            currentSwells = swells0;
                            $('#musicianDonation').text("");
                            }
                        else if (bankNumber == 1)
                            {currentSound = sound1;
                            currentSwells = swells1;
                            SOUND_DONATION_ADDRESS = "144b31mmaWQVDQFiUPo6HEzxc2Dm83WXrW";
                            musicianAddress = "144b31mmaWQVDQFiUPo6HEzxc2Dm83WXrW";
                            $('#musicianDonation').html("<a href='bitcoin:144b31mmaWQVDQFiUPo6HEzxc2Dm83WXrW'>144b31mmaWQVDQFiUPo6HEzxc2Dm83WXrW</a>");}
                            
                        else if (bankNumber == 2)
                            {currentSound = sound2;
                            currentSwells = swells2;
                            SOUND_DONATION_ADDRESS = "1JFaYRGkDmhpSTbFKwqDWKr2ncvvrgYEAV";
                            musicianAddress = "1JFaYRGkDmhpSTbFKwqDWKr2ncvvrgYEAV";
                            $('#musicianDonation').html("<a href='bitcoin:1JFaYRGkDmhpSTbFKwqDWKr2ncvvrgYEAV'>1JFaYRGkDmhpSTbFKwqDWKr2ncvvrgYEAV</a>");}
                        
			//Sound.loadup(bankNumber);
			//Sound.init;
		}
	});
	
	globalScalePitch = $("#scalePitchCheckBox").attr("checked");
		console.log("globalscalepitch loaded");
}
var currentNotes = 0;
var noteTimeout = 500;

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
	

	//var readyState = currentSound[index].get("readyState");
	if (currentNotes < 5) {
                currentSound[index].volume(volume);
		currentSound[index].play();
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
		randomIndex = Math.floor(Math.random() * currentSwells.length);
		console.log("New Number");
	} while (randomIndex == lastBlockSound);

	lastBlockSound = randomIndex;

	//var readyState = this.swells[randomIndex].get("readyState");
	//if (readyState >= 2)
	currentSwells[randomIndex].play();
}