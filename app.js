http = require('http'),
    twilio = require('twilio'),
    client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN),
    port = (process.env.PORT || 3000),
    url = require('url');

http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    console.dir(query);
    var twiml = new twilio.TwimlResponse();
    console.log('Call from [' + query.From + '], expecting [' + process.env.FRONT_DOOR_NUMBER + ']');
    if (query.From === process.env.FRONT_DOOR_NUMBER) {
        console.log('Greeting.');
        twiml.say('Bienvenue chez étincelle coworking.', {
            voice: 'alice',
            language: 'fr-FR'
        });
        console.log('Opening the door...');
        twiml.pause();
        twiml.play({digits: '*'});
        twiml.pause();

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }
}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);
