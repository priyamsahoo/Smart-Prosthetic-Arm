var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    leap_range = [-100,100], // x of right hand
    frame,fs = require('fs');    
var stdin = process.stdin;
stdin.resume();
stdin.setEncoding( 'utf8' );
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    
    console.log('Do your gesture...');

 ws.on('message', function(data, flags) {
        frame = JSON.parse(data);
        var jsonContent = JSON.stringify(frame);
        //console.log(jsonContent); 
        //console.log(frame);
        process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } if (key.name==='s'){
       process.stdout.write("Gesture recorded\r");
        fs.writeFile("gesture_save.json", jsonContent, 'utf8');
      }
    
      
    });



       
        });
