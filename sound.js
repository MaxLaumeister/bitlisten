function Sound() {
	
}

Sound.init = function() {
	
	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	var newSound;
	var istring;
	
	// Celesta
	this.celesta = new Array();
	for (var i = 1; i <= 22; i++) {
		istring = zeroPad(i, 3);
		newSound = new buzz.sound("sounds/celesta/c" + istring + ".ogg");
		this.celesta.push(newSound);
		newSound.load();
	}
	
	// String swells
	this.swells = new Array();
	for (var i = 1; i <= 5; i++) {
		newSound = new buzz.sound("sounds/swells/swell" + i + ".ogg");
		this.swells.push(newSound);
		newSound.load();
	}

}

Sound.playRandomAtVolume = function(volume) {
	var randomIndex = Math.floor(Math.random() * this.celesta.length);
	this.celesta[randomIndex].stop().setVolume(volume).play();
}

Sound.playRandomSwell = function() {
	var randomIndex = Math.floor(Math.random() * this.swells.length);
	this.swells[randomIndex].stop().play();
}
