const request = require('request')
const tokens = require('./tokens.js')

// It needs to include a tokens.js file to get the tokens with the variables tokenGeocode and tokenForecast in order not to share them at github. Then you must export the variables. The code shoul be like:

//const tokenGeocode = '<your access token for https://api.mapbox.com/>'
//const tokenForecast = '<your access token for http://api.weatherstack.com/>'
//module.exports = {
//  tokenGeocode,
//  tokenForecast
//}

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ tokens.tokenForecast + '&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.temperature + '% chance of rain.')
        }
    })
}

module.exports = forecast