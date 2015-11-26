var tessel = require('tessel');
var blelib = require('ble-ble113a');

var ble = blelib.use(tessel.port['A']);

ble.on('ready', function(err) {
  console.log('Scanning...');
  ble.startScanning();
});

ble.on('discover', function(p) {
	if (p.address.toString() == "130.78.182.57.205.32"){
		console.log("found the brush");		
                ble.stopScanning();
		var adatas = p.advertisingData;
		/*for (var i in adatas){
		    var data = adatas[i].data;
		     for (var j=0; j< data.length ; j++) {
			console.log(" "+i+","+j+" "+data[j].toString(16));
		    }
		}*/
		var dhi = adatas[1].data[7];
		var dlow = adatas[1].data[8];
		var duration = 100 * dhi + dlow;
		console.log(" duration "+duration);
	}
});

