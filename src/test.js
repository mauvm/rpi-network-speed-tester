var bunyan = require('bunyan')
var speedTest = require('speedtest-net')
var log = bunyan.createLogger({
	name: 'rpi-network-speed-tester',
	streams: [
		{
			level: 'trace',
			path: './output.log',
		},
	],
})

var test = speedTest({
	maxTime: 5 * 60 * 1000 // ms
})
var events = [
	'downloadprogress',
	'uploadprogress',
	'error',
	'config',
	//'servers',
	//'bestservers',
	'testserver',
	'downloadspeed',
	'uploadspeed',
	'downloadspeedprogress',
	'uploadspeedprogress',
	'result',
	'data',
]

events.forEach((ev) => {
	test.on(ev, (data) => {
		var msg = ''
		if (typeof data !== 'object') {
			msg = data
			data = {}
		}
		data.type = ev
		log.info(data, msg)
	})
})

test.on('result', (data) => {
	log.info({ type: 'status' }, 'Done')
})

log.info({ type: 'status' }, 'Test started')
