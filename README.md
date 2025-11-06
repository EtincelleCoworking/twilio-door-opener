# twilio-door-opener

Our coworking space has a system that lets visitors dial a buzz code at
the door which is supposed to call CEO's phone, then he can respond and
talk to them, then press `*` to let them in.

We wanted to automate this.

## To set it up:

1. Clone this repository.
2. Set those env variables on Heroku:
   * `ACCOUNT_SID`
   * `AUTH_TOKEN`
   * `FRONT_DOOR_NUMBER`
   * 'DOOR_STATUS_API_UR'
3. Deploy to Heroku.
4. Point your Twilio number @ the URL for your Heroku app.

## Credits

* mgingras/twilio-door-opener
