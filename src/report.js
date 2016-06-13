var path = require('path')
var exec = require('child_process').exec
var bunyan = require('bunyan')
var request = require('request')

require('dotenv').config()

var log = bunyan.createLogger({
	name: 'rpi-network-speed-reporter',
	streams: [
		{
			level: 'trace',
			path: './output.log',
		},
	],
})
log.info({ type: 'status' }, 'Report started')

exec(path.resolve(path.join(__dirname, '../bin/list.sh')), (err, stdout, stderr) => {
	if (err) return log.error({ type: 'error' }, '' + err)
	if (stderr) return log.error({ type: 'error' }, '' + stderr)

	var varmailUrl = process.env['VARMAIL_URL']

	if (varmailUrl) {
		log.info({ type: 'status' }, 'Sending Varmail')

		var subject = 'RPi Network Speed Tester Report'
		var text = 'My dearest human,\n\nHere are the results:\n\n' + stdout + '\nWith love, RPi'

		request.post({
			url: varmailUrl,
			body: {
				subject: subject,
				text: text,
			},
			json: true,
		}, (err, res, body) => {
			if (err) return log.error({ type: 'error' }, '' + err)
			console.log(res.statusCode, body)

			log.info({ type: 'status' }, 'Varmail sent')
		})
	}
})
