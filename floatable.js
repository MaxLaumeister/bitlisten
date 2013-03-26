function Floatable() {
	this.velocity = {
		x : 0,
		y : -1
	};
	
	this.div = document.createElement("div");
	this.div.className = "floatableDiv";
	document.getElementById(pageDivId).appendChild(this.div);
		this.innerDiv = document.createElement("div");
	this.div.appendChild(this.innerDiv);
	this.innerDiv.className = "innerDiv";
	
	/*var innerdiv = document.createElement("div");
	innerdiv.className = "innerDiv";
	this.div.appendChild(innerdiv);*/

	var self = this;
	this.intervalId = setInterval(function() {
		self.update();
	}, 40);
}

Floatable.prototype.update = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;

	this.velocity.x += Math.random() * 0.1 - 0.05;
	if (this.velocity.x > 2)
		this.velocity.x = 2;
	if (this.velocity.x < -2)
		this.velocity.x = -2;
	if (this.x < 0) this.velocity.x += 0.02;
	if (this.x > pageWidth - this.width) this.velocity.x -= 0.02;

	this.updateDiv();

	if (this.y < -this.height)
		this.removeSelf();
}

Floatable.prototype.updateDiv = function() {
	this.div.style.top = this.y + "px";
	this.div.style.left = this.x + "px";
	this.div.style.width = this.width + "px";
	this.div.style.height = this.height + "px";
	this.innerDiv.style.top = (this.height/2  - this.innerDiv.offsetHeight/2) + 'px'; // Centers the text within the bubble
}

Floatable.prototype.removeSelf = function() {
	document.getElementById(pageDivId).removeChild(this.div);
	clearInterval(this.intervalId);
}

Floatable.prototype.addImage = function(source, width, height) {
	this.image = document.createElement('img');
	this.image.src = source;
	this.image.height = height;
	this.image.width = width;
	this.image.style.position = "absolute";
	this.image.style.top = "0px";
	this.image.style.left = "0px";
	this.div.appendChild(this.image);
}

Floatable.prototype.addText = function(text) {
	this.innerDiv.innerHTML += text;
}

Floatable.prototype.initPosition = function() {
	this.x = Math.random() * (pageWidth - this.width);
	this.y = pageHeight;
	this.updateDiv();
}
