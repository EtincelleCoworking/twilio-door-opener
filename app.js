const https = require('https');
const port = (process.env.PORT || 3000);
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
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
            } else {
                console.log('Opening the door...');
                twiml.say('Nos bureaux sont actuellement fermés.', {
                    voice: 'alice',
                    language: 'fr-FR'
                });

            }
            response.type('text/xml');
            response.send(twiml.toString());

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        response.type('text/plain');
        response.send('Internal error');
    });
});

// Create an HTTP server and listen for requests on port 1337
app.listen(port, () => {
    console.log('TwiML server running on port ' + port);
});

