/** @constructor */
function Floatable() {
	this.velocity = {
		x : 0,
		y : -1
	};
	
	this.pageDiv = document.getElementById("bubbleDiv");
	this.updateContainerSize();

	this.div = document.createElement("div");
	this.div.className = "floatableDiv";
	this.pageDiv.appendChild(this.div);
	this.innerDiv = document.createElement("div");
	this.div.appendChild(this.innerDiv);
	this.innerDiv.className = "innerDiv";

	// Add this object to the update array
	updateTargets.push(this);
}

Floatable.prototype.updateContainerSize = function() {
	this.pageDivWidth = $(this.pageDiv).width();
	this.pageDivHeight = $(this.pageDiv).height();
};

Floatable.prototype.update = function(deltatime) {
	var HVEL_MAX = 1;
	var step = deltatime / 50;
	
	this.x += this.velocity.x * step;
	this.y += this.velocity.y * step;

	this.velocity.x += (Math.random() * 0.1 - 0.05) * step;
	if (this.velocity.x > HVEL_MAX) {
		this.velocity.x = HVEL_MAX;
	} else if (this.velocity.x < -HVEL_MAX) {
		this.velocity.x = -HVEL_MAX;
	}
	if (this.x < 0) {
		this.velocity.x += 0.005 * step;
	} else if (this.x > this.pageDivWidth - this.width) {
		this.velocity.x -= 0.005 * step;
	}

	this.updateDiv();

	if (this.y < -this.height)
		this.removeSelf();
};

Floatable.prototype.updateDiv = function() {
	this.div.style["-webkit-transform"] = "translate(" + this.x + "px," + this.y + "px)";
	this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
};

Floatable.prototype.removeSelf = function() {
	this.pageDiv.removeChild(this.div);
	// Remove self from update array
	updateTargets.splice(updateTargets.indexOf(this), 1);
};

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
};

Floatable.prototype.addText = function(text) {
	this.innerDiv.innerHTML += text;
};

Floatable.prototype.initPosition = function() {
	this.x = Math.random() * (this.pageDivWidth - this.width);
	this.y = this.pageDivHeight;
	this.updateDiv();
	this.div.style.width = this.width + "px";
	this.div.style.height = this.height + "px";
	this.innerDiv.style.top = (this.height / 2 - this.innerDiv.offsetHeight / 2) + 'px';
	// Centers the text within the bubble
};

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
	
	derpy.update = function(time) {
		Floatable.prototype.update.call(derpy, time);
		derpy.velocity.x += Math.random() * 0.3 - 0.15;
		if (derpy.velocity.x > 0.1) {
			$(derpy.image).css({
				"-moz-transform": "scaleX(-1)",
				"-o-transform": "scaleX(-1)",
				"-webkit-transform": "scaleX(-1)",
				"transform": "scaleX(-1)"
			});
		}
		if (derpy.velocity.x < -0.1) {
			$(derpy.image).css({
				"-moz-transform": "scaleX(1)",
				"-o-transform": "scaleX(1)",
				"-webkit-transform": "scaleX(1)",
				"transform": "scaleX(1)"
			});
		}
	};
};
new Konami(easterSuccess);
