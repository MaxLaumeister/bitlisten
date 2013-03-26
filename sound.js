function Sound() {
	
}

Sound.init = function() {
	
	function zeroPad(num, places) {
		var zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	// We are creating an array of all the notes of each

	this.celesta = new Array();

	var newSound;
	var istring;
	for (var i = 1; i <= 22; i++) {
		istring = zeroPad(i, 3);
		newSound = new buzz.sound("sounds/celesta/c" + istring + ".ogg");
		this.celesta.push(newSound);
		newSound.load();
	}

}

Sound.playRandomAtVolume = function(volume) {
	
	var randomIndex = Math.floor(Math.random() * this.celesta.length);
	this.celesta[randomIndex].stop().setVolume(volume).play();
}