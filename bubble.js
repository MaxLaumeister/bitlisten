function Transaction(magnitude) {
	Floatable.call(this);

	this.area = magnitude * 100 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.magnitude = magnitude;
	this.roundedMagnitude = magnitude.toFixed(2);

	this.div.innerHTML = '<span>&#3647;' + this.roundedMagnitude + '<br />New Line</span>';
	this.addImage("images/bubble.png", this.width, this.height);

	this.initPosition();

	// Sound
	var maxMagnitude = 1000;
	var minMagnitude = 0;
	var minVolume = 0.8;
	var maxVolume = 1;

	var volume = magnitude / (maxMagnitude / (maxVolume - minVolume)) + minVolume;
	console.log(volume);
	Sound.playRandomAtVolume(volume * 100);
}

extend(Floatable, Transaction);

