var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {

    var nasa_id = 'TrRfMk9Yfvvv1G1Ngwx5U9hwH7GtX6loEPf0aqsR';
    var count = 20;

    axios({
        url: `https://api.nasa.gov/planetary/apod?api_key=${nasa_id}&count=${count}`,
        method: 'GET',
        dataType:'json',
    })
    .then(items => {
        // console.log(items.data);
        res.render('home', {
            message: 'Showing 20 random APODs:',
            images: items.data,
            home: true
        })
    })
    .catch(error => {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        }
        res.render('/home',{
            message: error + ' -- There was an error with the API. Trying contacting NASA.',
            images: '',
            home: false
        })
    });

});

app.post('/date-range', function(req, res) {

    var nasa_id = 'TrRfMk9Yfvvv1G1Ngwx5U9hwH7GtX6loEPf0aqsR';
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
      
    axios({
        url: `https://api.nasa.gov/planetary/apod?api_key=${nasa_id}&start_date=${start_date}&end_date=${end_date}`,
        method: 'GET',
        dataType:'json',
    })
    .then(items => {
        // console.log(items);
        res.render('home', {
            message: `Showing APODs from ${start_date} to ${end_date}:`,
            images: items.data,
            home: false
        })

    })
    .catch(error => {
        // console.log(error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
        }
        res.render('home',{
            message: error + ' -- Your date range was probably invalid. Please try again.',
            images: '',
            home: false
        })
    });

});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});