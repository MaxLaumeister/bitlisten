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

Floatable.prototype.addImage = function(image, width, height) {
	this.canvas = document.createElement('canvas');
	this.image = image;
	this.canvas.height = height;
	this.canvas.width = width;
	this.canvas.style.position = "absolute";
	this.canvas.style.top = "0px";
	this.canvas.style.left = "0px";
	var ctx = this.canvas.getContext("2d");
	ctx.drawImage(this.image, 0, 0, width - 1, height - 1);

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

// Thanks to Myself-Remastered for the image used in this easter egg
// http://myself-remastered.deviantart.com/art/Derpy-Delivery-251264643
var easterSuccess = function() {
	var derpy = new Floatable();
	derpy.width = 53;
	derpy.height = 48;
	
	derpy.image = document.createElement('img');
	derpy.image.src = "images/easteregg.gif";
	derpy.image.height = derpy.height;
	derpy.image.width = derpy.width;
	derpy.image.style.position = "absolute";
	derpy.image.style.top = "0px";
	derpy.image.style.left = "0px";
	derpy.div.appendChild(derpy.image);
	
	derpy.initPosition();
	
	derpy.update = function() {
		Floatable.prototype.update.call(this);
		this.velocity.x += Math.random() * 0.3 - 0.15;
		if (derpy.velocity.x > 0.1) {
			$(this.div).css({
				"-moz-transform": "scaleX(-1)",
        		"-o-transform": "scaleX(-1)",
        		"-webkit-transform": "scaleX(-1)",
        		"transform": "scaleX(-1)"
			});
		}
		if (derpy.velocity.x < -0.1) {
			$(this.div).css({
				"-moz-transform": "scaleX(1)",
        		"-o-transform": "scaleX(1)",
        		"-webkit-transform": "scaleX(1)",
        		"transform": "scaleX(1)"
			});
		}
	}
}
new Konami(easterSuccess);
