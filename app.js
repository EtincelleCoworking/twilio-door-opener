// Utilisée comme Fonction chez Twilio directement https://console.twilio.com/us1/develop/functions/services
const request = require('sync-request');

exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();

    const lookupResponse = request('GET', 'https://etincelle.at/api/intercom/toulouse-carmes');

    console.log(lookupResponse.getBody().toString());
    if(lookupResponse.getBody().toString() === 'Yes'){
        twiml.say({
            voice: 'Google.fr-FR-Chirp3-HD-Aoede',
            language: 'fr-FR'
        }, 'Bienvenue chez étincelle coworking. Nos bureaux sont situés au premier étage.');
        console.log('Opening the door...');
        twiml.pause();
        twiml.play({digits: '*'});
        twiml.pause();
    }else{
        console.log('Leaving door closed...');
        twiml.say({
            voice: 'Google.fr-FR-Chirp3-HD-Aoede',
            language: 'fr-FR'
        }, 'Nos bureaux sont actuellement fermés.');
    }

    return callback(null, twiml);
};