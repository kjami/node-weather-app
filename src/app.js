/*global require, __dirname,process*/
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherInfo');

const app = express();
// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3001;

//All paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialViewsPath = path.join(__dirname, '../templates/partials');

//Set handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialViewsPath);

//Set static folder
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: "Address is mandatory!",
            type: 'weather'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error.message,
                type: 'geocode'
            });
        } else {
            weatherInfo(latitude, longitude, (weatherError, forecast) => {
                if (error) {
                    return res.send({
                        error: weatherError.message,
                        type: 'weatherInfo'
                    });
                } else {
                    return res.send({
                        forecast,
                        location,
                        address
                    });
                }
            })
        }
        return null;
    });
    return null;
});

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        message: "No page for this help topic.",
        title: "404"
    });
});

app.get('*', (req, res) => {
    res.render('404-page', {
        message: 'No Page found',
        title: "404"
    });
});

//Run the server on given port
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("Server up and running on port " + port + ".");
});