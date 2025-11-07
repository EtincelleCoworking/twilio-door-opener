// Utilisée comme Fonction chez Twilio directement https://console.twilio.com/us1/develop/functions/services
const request = require('sync-request');

exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    const voice_config = {
        voice: 'Google.fr-FR-Chirp3-HD-Aoede',
        language: 'fr-FR'
    };

    const lookupResponse = request('GET', 'https://etincelle.at/api/intercom/toulouse-carmes');

    if(lookupResponse.getBody().toString() === 'Yes'){
        twiml.say(voice_config, 'Bienvenue chez étincelle coworking. Nos bureaux sont situés au premier étage.');
        console.log('Opening the door...');
        twiml.pause();
        twiml.play({digits: '*'});
        twiml.pause();
    }else{
        console.log('Leaving door closed...');
        twiml.say(voice_config, 'Nos bureaux sont actuellement fermés.');
    }

    return callback(null, twiml);
};