const request = require('request')
const tokens = require('./tokens.js')


// It needs to include a tokens.js file to get the tokens with the variables tokenGeocode and tokenForecast in order not to share them at github. Then you must export the variables. The code shoul be like:

//const tokenGeocode = '<your access token for https://api.mapbox.com/>'
//const tokenForecast = '<your access token for http://api.weatherstack.com/>'
//module.exports = {
//  tokenGeocode,
//  tokenForecast
//}

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token='+ tokens.tokenGeocode+'&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode