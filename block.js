function Block(height, numTransactions, outputTotal, blockSize) {
	Floatable.call(this);
	
	this.width = this.height = 500;

	this.addImage("images/block.png", this.width, this.height);
	this.addText("Block #" + height +"<br />Number of Transactions: " + numTransactions + "<br />Transaction Volume: " + outputTotal + "<br />Block Size: " + blockSize);
	this.initPosition();

	// Sound
	Sound.playRandomAtVolume(100);
}

extend(Floatable, Block);
