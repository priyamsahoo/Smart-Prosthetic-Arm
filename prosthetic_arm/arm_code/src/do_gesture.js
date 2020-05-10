
var five = require('johnny-five'),
     board = new five.Board(),
    LeapFrame = require('./lib/leapFrame'),
    Joint = require('./lib/joint'),
    fs = require('fs'),frame,
    i=0;

var rawdata = fs.readFileSync('gesture_save.json');  
 frame = JSON.parse(rawdata);  
console.log(frame);  

board.on('ready', function() {

  var thumb = new Joint({
    // frame.deltaHandFingerThumb.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 9,
    range: [30,170]
  });
  var index = new Joint({
    // frame.deltaHandFingerIndex.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 11,
    range: [30,170]
  });
  var middle = new Joint({
    // frame.deltaHandFingerMiddle.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 12,
    range: [30,170]
  });
  var ring = new Joint({
    // frame.deltaHandFingerRing.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 5,
    range: [30,170]
  });
  var little = new Joint({
    // frame.deltaHandFingerLittle.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 6,
    range: [30,170]
  });

  var palm = new Joint({
  // frame.palmNormal.x traccked range
    minPos: -30,
    maxPos: 30,
    pin: 2,
    range: [50,150]
  });

/*

  ws.on('message', function(data, flags) {
    i++;
    // track only 40frame/s
    if (i%3 === 0) {
      frame = new LeapFrame(data);
      if(frame.valid) { 
    thumb.move(25+frame.deltaHandFingerThumb.y);

    index.move(frame.deltaHandFingerIndex.y); 
    middle.move(frame.deltaHandFingerMiddle.y); 
    ring.move(frame.deltaHandFingerRing.y); 
    little.move(frame.deltaHandFingerLittle.y);

    palm.move(frame.palmNormal.x * 100);    //angle normalization
    //console.log("Thumb"+frame.deltaHandFingerThumb.y);  ;
      }
      i=0;
    }
  });

*/
});