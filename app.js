http = require('http'),
    https = require('https'),
    twilio = require('twilio'),
    client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN),
    port = (process.env.PORT || 3000),
    url = require('url');

http.createServer(function (req, res) {
//    var query = url.parse(req.url, true).query;
//    console.dir(query);
//    console.log(query.From);
    var twiml = new twilio.TwimlResponse();
//    console.log('Call from [' + query.From + '], expecting [' + process.env.FRONT_DOOR_NUMBER + ']');
//    if (query.From === process.env.FRONT_DOOR_NUMBER) {
        console.log('Greeting.');
        twiml.say('Bienvenue chez étincelle coworking.', {
            voice: 'alice',
            language: 'fr-FR'
        });

        https.get(process.env.DOOR_STATUS_API_URL, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                if (data === 'Yes') {
                    console.log('Opening the door...');
                    twiml.pause();
                    twiml.play({digits: '*'});
                    twiml.pause();

                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                } else {
                    console.log('Opening the door...');
                    twiml.say('Nos bureaux sont actuellement fermés.', {
                        voice: 'alice',
                        language: 'fr-FR'
                    });

                    res.writeHead(200, {'Content-Type': 'text/xml'});
                    res.end(twiml.toString());
                }
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal error');
        });
//    } else {
//        res.writeHead(404, {'Content-Type': 'text/plain'});
//        res.end('File not found');
//    }
}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);
