

var five = require('johnny-five'),
    webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    board = new five.Board(),
    LeapFrame = require('./lib/leapFrame'),
    Joint = require('./lib/joint'),
    frame,
    i=0;

board.on('ready', function() {

  var thumb = new Joint({
    // frame.deltaHandFingerThumb.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 6,
    range: [50,170]
  });
  var index = new Joint({
    // frame.deltaHandFingerIndex.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 9,
    range: [50,170]
  });
  var middle = new Joint({
    // frame.deltaHandFingerMiddle.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 10,
    range: [50,170]
  });
  var ring = new Joint({
    // frame.deltaHandFingerRing.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 11,
    range: [50,170]
  });
  var little = new Joint({
    // frame.deltaHandFingerLittle.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 12,
    range: [50,170]
  });

  var palm = new Joint({
	// frame.palmNormal.x traccked range
    minPos: -85,
    maxPos: 85,
    pin: 5,
    range: [0,170]
  });

  thumb.move(90);
  index.move(90);
  middle.move(90);
  ring.move(90);
  little.move(90);

  ws.on('message', function(data, flags) {
    i++;
    // track only 40frame/s
    if (i%3 === 0) {
      frame = new LeapFrame(data);
      if(frame.valid) {	
		thumb.move(frame.deltaHandFingerThumb.y);	
		index.move(frame.deltaHandFingerIndex.y);	
		middle.move(frame.deltaHandFingerMiddle.y);	
		ring.move(frame.deltaHandFingerRing.y);	
		little.move(frame.deltaHandFingerLittle.y);

		palm.move(frame.palmNormal.x * 100);		//angle normalization
      }
      i=0;
    }
  });
});
