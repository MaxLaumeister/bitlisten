function Bubble() {
	this.div = document.createElement("div");
	this.div.id = "instance" + instanceId;
	this.div.className = "bubbleDiv";
	instanceId++;
	

	this.div.style.position = "absolute";

	this.x = Math.random() * 800;
	this.y = 250;
	this.width = 100;
	this.height = 100;
	this.div.innerHTML = '<span class="bubbleLabel" style="line-height: ' + this.height + 'px;">Hello</span>';
	this.updateDiv();

	document.getElementById(pageDivId).appendChild(this.div);

	this.addImage("images/bubble.png", this.width, this.height);

	var self = this;
	this.intervalId = setInterval(function() {
		self.update();
	}, 100);
}

Bubble.prototype.update = function() {
	this.y -= 1;
	this.updateDiv();

	if (this.y <= 100)
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
