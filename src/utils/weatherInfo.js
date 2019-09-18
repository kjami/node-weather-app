/*global require, module*/
const request = require('request');
const log = require('../log');

module.exports = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/fc2c3eb2d4eac475ff0a1dc66f9a6f89/" + latitude + "," + longitude + "?units=si&exclude=minutely&exclude=hourly";
    request({
        url: url,
        json: true
    }, (error, { body: responseBody }) => {
        if (error) {
            // eslint-disable-next-line callback-return
            callback(error)
        } else if (!responseBody.daily || !responseBody.daily.data || !responseBody.currently) {
            // eslint-disable-next-line callback-return
            callback(new Error("Info not available"));
        } else {
            const todaysWeather = responseBody.daily.data[0];
            const currentWeather = responseBody.currently;
            if (typeof callback === "function") {
                const forecast = todaysWeather.summary + ` It is currently ${currentWeather.temperature} degrees out. There is ${currentWeather.precipProbability}% chance of rain.`;
                // eslint-disable-next-line callback-return
                callback(null, forecast);
            } else {
                log("No callback provided");
            }
        }
    });
}