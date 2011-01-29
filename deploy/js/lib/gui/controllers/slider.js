// TODO: Leaving the window while dragging the slider and then removing the mouse
// still leaves slider in focus.
// TODO: Problem with multiple sliders.
var Slider = function(numberController, min, max, step, initValue) {
	
	var min = min;
	var max = max;
	var step = step;
	
	var clicked = false;
	var _this = this;
	
	var x, px;
	
	this.domElement = document.createElement('div');
	this.domElement.setAttribute('class', 'guidat-slider-bg');
	
	this.fg = document.createElement('div');
	this.fg.setAttribute('class', 'guidat-slider-fg');
	
	this.domElement.appendChild(this.fg);
	
	var map = function(v, i1, i2, o1, o2) {
		var v = o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
		if (v < o1) v = o1;
		else if (v > o2) v = o2;
		return v;
	}
	
	var findPos = function(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curleft,curtop];
		}
	}
	
	this.__defineSetter__('value', function(e) {
		var pct = map(e, min, max, 0, 100);
		this.fg.style.width = pct+"%";
	});

	var onDrag = function(e) {
		if (!clicked) return;
		var pos = findPos(_this.domElement);
		var val = map(e.pageX, pos[0], pos[0] + _this.domElement.offsetWidth, min, max);
		val = Math.round(val/step)*step;
		numberController.updateValue(val);
		numberController.setTargetValue(numberController.value);
	}
	
	this.domElement.addEventListener('mousedown', function(e) {
		clicked = true;
		x = px = e.pageX;
		_this.domElement.setAttribute('class', 'guidat-slider-bg active');
		_this.fg.setAttribute('class', 'guidat-slider-fg active');
		onDrag(e);
	}, false);
	
	
	document.addEventListener('mouseup', function(e) {
		_this.domElement.setAttribute('class', 'guidat-slider-bg');
		_this.fg.setAttribute('class', 'guidat-slider-fg');
		clicked = false;
	}, false);
	
	document.addEventListener('mousemove', onDrag, false);
	
	this.value = initValue;	
		
}
