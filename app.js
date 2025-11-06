const http = require('http');
const https = require('https');
//const twilio = require('twilio');
//client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN),
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const port = (process.env.PORT || 3000);
const url = require('url');

http.createServer(function (request, response) {
    var query = url.parse(request.url, true).query;
    console.dir(query);
    console.log(query.From);
    const twiml = new VoiceResponse();
    console.log('Call from [' + query.From + '], expecting [' + process.env.FRONT_DOOR_NUMBER + ']');
    //if (query.From === process.env.FRONT_DOOR_NUMBER) {
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

                    response.type('text/xml');
                    response.send(twiml.toString());
                } else {
                    console.log('Opening the door...');
                    twiml.say('Nos bureaux sont actuellement fermés.', {
                        voice: 'alice',
                        language: 'fr-FR'
                    });

                    response.type('text/xml');
                    response.send(twiml.toString());
                }
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            response.type('text/plain');
            response.send('Internal error');
        });
    //} else {
//        res.writeHead(404, {'Content-Type': 'text/plain'});
//        res.end('File not found');
    //}
}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);


