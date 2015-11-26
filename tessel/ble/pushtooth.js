var tessel = require('tessel');
var blelib = require('ble-ble113a');
var http = require('http');

var duration = 120;
var count = 1;

function postDur () {
  console.log('http request #' + (count++))
  http.get("http://yopet.us/brush/map/putBrush.groovy?duration=" + duration, function (res) {
    console.log('# statusCode', res.statusCode)

    var bufs = [];
    res.on('data', function (data) {
      bufs.push(new Buffer(data));
      console.log('# received', new Buffer(data).toString());
    })
    res.on('close', function () {
      console.log('done.');
    })
  }).on('error', function (e) {
    console.log('not ok -', e.message, 'error event')
  });
}

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
		var dhi = adatas[1].data[7];
		var dlow = adatas[1].data[8];
		duration = 100 * dhi + dlow;
		console.log(" duration "+duration);
		postDur();
	}
});

