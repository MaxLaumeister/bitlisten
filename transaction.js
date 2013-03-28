function Transaction(bitcoins, currency, currencyName, highlight) {
	Floatable.call(this);

	this.area = bitcoins * 100 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.addImage("images/bubble.png", this.width, this.height);
	this.addText('&#3647;' + bitcoins.toFixed(2));
	if (currency && currencyName) {
		this.addText('<br />' + currency.toFixed(2) + ' ' + currencyName);
	}
	this.initPosition();

	// Sound
	var maxBitcoins = 1000;
	var minVolume = 0.3;
	var maxVolume = 0.6;
	var volume = bitcoins / (maxBitcoins / (maxVolume - minVolume)) + minVolume;
	Sound.playRandomAtVolume(volume * 100);
}

extend(Floatable, Transaction);
