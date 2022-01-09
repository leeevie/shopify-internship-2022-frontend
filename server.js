var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.redirect("/home");
});

app.get('/home', function(req, res) {
    res.render("home", {
        page_title: "Home",
        // show: '',
        // message: ''
    });
});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});

// app.listen(3000);
// console.log('3000 is the magic port');