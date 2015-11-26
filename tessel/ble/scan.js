var tessel = require('tessel');
var blelib = require('ble-ble113a');

var ble = blelib.use(tessel.port['A']);

ble.on('ready', function(err) {
  console.log('Scanning...');
  ble.startScanning();
});

ble.on('discover', function(peripheral) {
  console.log("Discovered peripheral!", peripheral.toString());
  ble.discoverAllServices( peripheral,
	function (err, services){
            for(var i in services){
  		console.log("->>>> Available service :", services[i].toString());
	    }
	} );
});

