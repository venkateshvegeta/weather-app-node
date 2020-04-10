const request = require('request')

const geocode = (location,callback) => {
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoidmVua2F0ZXNoNDU1IiwiYSI6ImNrOGc0eXN6aTA4cnAzZ2xxeWV5OTRlamwifQ.KJ677sG4bBScqTgUYx4Qrw&limit=1"
    request({url:url,json:true},(error,{ body } = {})=>{
        if(error){
            callback("Unable to Connect,Please check the network connection",undefined)
        } else if (body.features.length === 0 ) {
            callback("Unable to find the coordinates for the search location",undefined)
        } else {
         const longitude = body.features[0].center[0]
         const latitude = body.features[0].center[1]
         const locationResult = body.features[0].place_name
         callback(undefined,{
            longitude,
            latitude,
            locationResult
         })
        }
    })
}

module.exports = geocode