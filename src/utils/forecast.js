const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/ada7889ed2e0a47bec56e725cf14f0c4/"+latitude+","+longitude
    request({ url, json: true }, (error, { body } ={} ) => {
        if (error) {
            callback("Unable to connect",undefined)
        } else if (body.error) {
            callback("Unable to find the weather report for the coordinates",undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + "It is currently " + (5/9)*((body.currently.temperature)-32) + " degrees out there. There is a "
                + body.currently.precipProbability + "% chance of rain")

        }

    })
}

module.exports = forecast