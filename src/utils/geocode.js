/*global require, module*/
const request = require('request');
const log = require('../log');

module.exports = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=2&access_token=pk.eyJ1Ijoia2lzaG9yamFtaSIsImEiOiJjazBvazdjeWQwNmZ5M25rcm1pODBtNXR4In0.sPs1rM51m4yP6lPG1YNUyw";
    request({
        url: url,
        json: true
    }, (error, { body: responseBody }) => {
        if (error) {
            // eslint-disable-next-line callback-return
            callback(error)
        } else if (!responseBody.features || !responseBody.features[0] || !responseBody.features[0].center || responseBody.features[0].center.length < 2) {
            // eslint-disable-next-line callback-return
            callback(new Error("Info not available"));
        }else {
            const geocode = responseBody.features[0].center;
            const location = responseBody.features[0].place_name;
            const longitude = geocode[0];
            const latitude = geocode[1];
            if (typeof callback === "function") {
                // eslint-disable-next-line callback-return
                callback(null, {
                    latitude, 
                    longitude, 
                    location
                });
            } else {
                log("no callback provided", latitude, longitude, location);
            }
        }
    });
}