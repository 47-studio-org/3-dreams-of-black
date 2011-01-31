THREE.Matrix3 = function () {

	this.m = [];
	this.flat = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1);
	
	this.flatten = function() {
	
		return this.flat;
	}
};

THREE.Matrix3.prototype = {

	transpose: function () {

		var tmp, m = this.m;

		tmp = m[1]; m[1] = m[3]; m[3] = tmp;
		tmp = m[2]; m[2] = m[6]; m[6] = tmp;
		tmp = m[5]; m[5] = m[7]; m[7] = tmp;

		return this;
	}
};
