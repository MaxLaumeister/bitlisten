function Bubble(magnitude) {
	this.div = document.createElement("div");
	this.div.id = "instance" + instanceId;
	this.div.className = "bubbleDiv";
	instanceId++;
	
	this.velocity = {x: 0, y: -1};
	
	this.magnitude = magnitude;
	this.roundedMagnitude = magnitude.toFixed(2);
	
	var maxMagnitude = 1000;
	var minMagnitude = 0;
	var minVolume = 0.2;
	var maxVolume = 1;
	
	var volume = magnitude/(maxMagnitude/(maxVolume-minVolume) + minVolume);
	Sound.playRandomAtVolume(volume * 100);
	
	this.area = magnitude * 100 + 3000;
	this.radius = Math.sqrt(this.area/Math.PI);
	
	this.div.style.position = "absolute";

	this.x = Math.random() * pageWidth;
	this.y = pageHeight;
	this.width = this.height = this.radius * 2;
	this.div.innerHTML = '<span class="bubbleLabel" style="line-height: ' + this.height + 'px;">&#3647;' + this.roundedMagnitude + '</span>';
	this.updateDiv();

	document.getElementById(pageDivId).appendChild(this.div);

	this.addImage("images/bubble.png", this.width, this.height);

	var self = this;
	this.intervalId = setInterval(function() {
		self.update();
	}, 40);
}

Bubble.prototype.update = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
	this.velocity.x += Math.random() * 0.1 - 0.05;
	if (this.velocity.x > 2) this.velocity.x = 2;
	if (this.velocity.x < -2) this.velocity.x = -2;
	
	this.updateDiv();

	if (this.y < -this.height)
		this.removeSelf();
}

Bubble.prototype.updateDiv = function() {
	this.div.style.top = this.y + "px";
	this.div.style.left = this.x + "px";
	this.div.style.width = this.width + "px";
	this.div.style.height = this.height + "px";
}

Bubble.prototype.removeSelf = function() {
	document.getElementById(pageDivId).removeChild(this.div);
	clearInterval(this.intervalId);
}

Bubble.prototype.addImage = function(source, width, height) {
	this.image = document.createElement('img');
	this.image.src = source;
	this.image.height = height;
	this.image.width = width;
	this.image.style.position = "absolute";
	this.image.style.top = "0px";
	this.image.style.left = "0px";
	this.div.appendChild(this.image);
}
