function Transaction(bitcoins, highlight, currency, currencyName) {
	Floatable.call(this);

	this.area = bitcoins * 100 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.addImage("images/bubble.png", this.width, this.height);
	if (!highlight) {
		this.addText('&#3647;' + bitcoins.toFixed(2));
	} else {
		this.addText('<span style="color: yellow;">&#3647;' + bitcoins.toFixed(2) + '</span><br /><span style="color: cyan;">Donation</span><br /><span style="color: lime;">Thanks!</span>');
	}
	if (currency && currencyName) {
		this.addText('<br />' + currency.toFixed(2) + ' ' + currencyName);
	}
	this.initPosition();

	// Sound
	var maxBitcoins = 1000;
	var minVolume = 0.3;
	var maxVolume = 0.5;
	var volume = bitcoins / (maxBitcoins / (maxVolume - minVolume)) + minVolume;
	Sound.playRandomAtVolume(volume * 100);
}

extend(Floatable, Transaction);
