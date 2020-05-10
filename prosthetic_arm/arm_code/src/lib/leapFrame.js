

var LeapFrame = function(data) {

	this.frame = JSON.parse(data);

	var _isValid = function(frame) {
		// Check valid condition if 1 hand is verified
		if (frame.hands[0]) {
			// Check valid condition if 5 fingers are verified
			if (frame.pointables[0] && frame.pointables[1] && frame.pointables[2] && frame.pointables[3] && frame.pointables[4]) {
				var pointablesTEMP = new Array();
				pointablesTEMP[0] = Object.create(frame.pointables[0]);
				pointablesTEMP[1] = Object.create(frame.pointables[1]);
				pointablesTEMP[2] = Object.create(frame.pointables[2]);
				pointablesTEMP[3] = Object.create(frame.pointables[3]);
				pointablesTEMP[4] = Object.create(frame.pointables[4]);
				
				var val = new Array();
				val[0] = frame.pointables[0].stabilizedTipPosition[0];
				val[1] = frame.pointables[1].stabilizedTipPosition[0]; 
				val[2] = frame.pointables[2].stabilizedTipPosition[0];
				val[3] = frame.pointables[3].stabilizedTipPosition[0]; 
				val[4] = frame.pointables[4].stabilizedTipPosition[0];
				var i, j, temp;
				
				// Identify and match each pointable vector to five fingers
				for(i=0; i<4; i++) {
					for(j=i+1; j<=4; j++) {
						if(val[i]>val[j]) {
							temp = val[i];
							val[i] = val[j];
							val[j] = temp;
						}
					}			
				}
				
				for(i=0; i<5; i++) {
					for(j=0; j<5; j++) {
						if(pointablesTEMP[j].stabilizedTipPosition[0] === val[i])
							frame.pointables[i] = pointablesTEMP[j];
					}
				}				
				return true;
			}
		}
		return false;
	}

	/**
	 * Calculate the angle between 2 vectors in degrees
	 * @param {Array} v1 - coordinates of the first vector
	 * @param {Array} v2 - coordinates of the second vector
	 * @return the angle in degrees
	 */
	var _vectorAngle = function(v1,v2) {
		var vectorProduct = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
		var v1Norm = Math.sqrt(v1.x*v1.x+v1.y*v1.y+v1.z*v1.z);
		var v2Norm = Math.sqrt(v2.x*v2.x+v2.y*v2.y+v2.z*v2.z);
		var cos = Math.acos(vectorProduct/ (v1Norm*v2Norm));
		return cos * 180 / Math.PI;
	};

	var _palmPosition = function(frame) {
		return {
			x : frame.hands[0].palmPosition[0],
			y : frame.hands[0].palmPosition[1],
			z : frame.hands[0].palmPosition[2]
		};
	};

	var _palmDirection = function(frame) {
		return {
			x : frame.hands[0].direction[0],
			y : frame.hands[0].direction[1],
			z : frame.hands[0].direction[2]
		};
	};

	var _palmNormal = function(frame) {
		return {
			x : frame.hands[0].palmNormal[0],
			y : frame.hands[0].palmNormal[1],
			z : frame.hands[0].palmNormal[2]
		};
	};


	//finger position and direction by each id
	//thunmb finger
	var _thumbPosition = function(frame) {
		return {
			x : frame.pointables[0].tipPosition[0],
			y : frame.pointables[0].tipPosition[1],
			z : frame.pointables[0].tipPosition[2]
		};
	};

	var _thumbDirection = function(frame) {
		return {
			x : frame.pointables[0].direction[0],
			y : frame.pointables[0].direction[1],
			z : frame.pointables[0].direction[2]
		};
	};	

	//index finger
	var _indexPosition = function(frame) {
		return {
			x : frame.pointables[1].tipPosition[0],
			y : frame.pointables[1].tipPosition[1],
			z : frame.pointables[1].tipPosition[2]
		};
	};

	var _indexDirection = function(frame) {
		return {
			x : frame.pointables[1].direction[0],
			y : frame.pointables[1].direction[1],
			z : frame.pointables[1].direction[2]
		};
	};
	
	//middle finger
	var _middlePosition = function(frame) {
		return {
			x : frame.pointables[2].tipPosition[0],
			y : frame.pointables[2].tipPosition[1],
			z : frame.pointables[2].tipPosition[2]
		};
	};

	var _middleDirection = function(frame) {
		return {
			x : frame.pointables[2].direction[0],
			y : frame.pointables[2].direction[1],
			z : frame.pointables[2].direction[2]
		};
	};

	//ring finger
	var _ringPosition = function(frame) {
		return {
			x : frame.pointables[3].tipPosition[0],
			y : frame.pointables[3].tipPosition[1],
			z : frame.pointables[3].tipPosition[2]
		};
	};

	var _ringDirection = function(frame) {
		return {
			x : frame.pointables[3].direction[0],
			y : frame.pointables[3].direction[1],
			z : frame.pointables[3].direction[2]
		};
	};

	//little finger
	var _littlePosition = function(frame) {
		return {
			x : frame.pointables[4].tipPosition[0],
			y : frame.pointables[4].tipPosition[1],
			z : frame.pointables[4].tipPosition[2]
		};
	};

	var _littleDirection = function(frame) {
		return {
			x : frame.pointables[4].direction[0],
			y : frame.pointables[4].direction[1],
			z : frame.pointables[4].direction[2]
		};
	};
	
	
	//finger angle by each id
	//thumb	finger
	var _thumbAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _thumbDirection(frame));
	};

	var _thumbAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _thumbDirection(frame));
	};

	//index finger
	var _indexAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _indexDirection(frame));
	};

	var _indexAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _indexDirection(frame));
	};

	//middle finger
	var _middleAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _middleDirection(frame));
	};

	var _middleAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _middleDirection(frame));
	};

	//ring finger
	var _ringAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _ringDirection(frame));
	};

	var _ringAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _ringDirection(frame));
	};

	//little finger
	var _littleAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _littleDirection(frame));
	};

	var _littleAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _littleDirection(frame));
	};
	
	
	//delta position value between parm and finger angle by each id
	//thumb finger
	var _deltaHandFingerThumb = function(frame) {
		return {
			x : _palmPosition(frame).x - _thumbPosition(frame).x,
			y : _palmPosition(frame).y - _thumbPosition(frame).y,
			z : _palmPosition(frame).z - _thumbPosition(frame).z
		};
	};

	//index finger
	var _deltaHandFingerIndex = function(frame) {
		return {
			x : _palmPosition(frame).x - _indexPosition(frame).x,
			y : _palmPosition(frame).y - _indexPosition(frame).y,
			z : _palmPosition(frame).z - _indexPosition(frame).z
		};
	};

	//middle finger
	var _deltaHandFingerMiddle = function(frame) {
		return {
			x : _palmPosition(frame).x - _middlePosition(frame).x,
			y : _palmPosition(frame).y - _middlePosition(frame).y,
			z : _palmPosition(frame).z - _middlePosition(frame).z
		};
	};
	
	//ring finger
	var _deltaHandFingerRing = function(frame) {
		return {
			x : _palmPosition(frame).x - _ringPosition(frame).x,
			y : _palmPosition(frame).y - _ringPosition(frame).y,
			z : _palmPosition(frame).z - _ringPosition(frame).z
		};
	};

	//little finger
	var _deltaHandFingerLittle = function(frame) {
		return {
			x : _palmPosition(frame).x - _littlePosition(frame).x,
			y : _palmPosition(frame).y - _littlePosition(frame).y,
			z : _palmPosition(frame).z - _littlePosition(frame).z
		};
	};



	if (_isValid(this.frame)) {
		this.valid = true;
		this.palmPosition = _palmPosition(this.frame);
		this.palmDirection = _palmDirection(this.frame);
		this.palmNormal = _palmNormal(this.frame);
		
		this.thumbDirection = _thumbDirection(this.frame);
		this.indexDirection = _indexDirection(this.frame);
		this.middleDirection = _middleDirection(this.frame);
		this.ringDirection = _ringDirection(this.frame);
		this.littleDirection = _littleDirection(this.frame);
		
		this.thumbDirection = _thumbDirection(this.frame);
		this.indexDirection = _indexDirection(this.frame);
		this.middleDirection = _middleDirection(this.frame);
		this.ringDirection = _ringDirection(this.frame);
		this.littleDirection = _littleDirection(this.frame);

		this.thumbAngleY = _thumbAngleY(this.frame);
		this.indexAngleY = _indexAngleY(this.frame);
		this.middleAngleY = _middleAngleY(this.frame);
		this.ringAngleY = _ringAngleY(this.frame);
		this.littleAngleY = _littleAngleY(this.frame);

		this.thumbAngleX = _thumbAngleX(this.frame);
		this.indexAngleX = _indexAngleX(this.frame);
		this.middleAngleX = _middleAngleX(this.frame);
		this.ringAngleX = _ringAngleX(this.frame);
		this.littleAngleX = _littleAngleX(this.frame);

		this.deltaHandFingerThumb = _deltaHandFingerThumb(this.frame);
		this.deltaHandFingerIndex = _deltaHandFingerIndex(this.frame);
		this.deltaHandFingerMiddle = _deltaHandFingerMiddle(this.frame);
		this.deltaHandFingerRing = _deltaHandFingerRing(this.frame);
		this.deltaHandFingerLittle = _deltaHandFingerLittle(this.frame);
	}
	else {
		this.valid = false;
	}
};

module.exports = LeapFrame;
