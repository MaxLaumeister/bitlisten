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

	// Add this object to the update array
	updateTargets.push(this);
}

Floatable.prototype.update = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;

	this.velocity.x += Math.random() * 0.1 - 0.05;
	if (this.velocity.x > 2)
		this.velocity.x = 2;
	if (this.velocity.x < -2)
		this.velocity.x = -2;
	if (this.x < 0)
		this.velocity.x += 0.02;
	if (this.x > window.innerWidth - this.width)
		this.velocity.x -= 0.02;

	this.updateDiv();

	if (this.y < -this.height)
		this.removeSelf();
}

Floatable.prototype.updateDiv = function() {
	this.div.style.top = this.y + "px";
	this.div.style.left = this.x + "px";
}

Floatable.prototype.removeSelf = function() {
	document.getElementById(pageDivId).removeChild(this.div);
	// Remove self from update array
	updateTargets.splice(updateTargets.indexOf(this), 1);
}

Floatable.prototype.addImage = function(source, width, height) {
	this.canvas = document.createElement('canvas');
	this.image = document.createElement('img');
	this.image.src = source;
	this.canvas.height = height;
	this.canvas.width = width;
	this.canvas.style.position = "absolute";
	this.canvas.style.top = "0px";
	this.canvas.style.left = "0px";
	var ctx = this.canvas.getContext("2d");
	ctx.drawImage(this.image, 0, 0, width-1, height-1);

	this.div.appendChild(this.canvas);
}

Floatable.prototype.addText = function(text) {
	this.innerDiv.innerHTML += text;
}

Floatable.prototype.initPosition = function() {
	this.x = Math.random() * (window.innerWidth - this.width);
	this.y = window.innerHeight;
	this.updateDiv();
	this.div.style.width = this.width + "px";
	this.div.style.height = this.height + "px";
	this.innerDiv.style.top = (this.height / 2 - this.innerDiv.offsetHeight / 2) + 'px';
	// Centers the text within the bubble
}
