'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/nodejsmongotest');

var users     = require('./models/users');
router.post('/login',function(req, res) {

        users.findOne({ username: req.body.username, password: req.body.password },function(err,user) {
            if (err)
                res.send(err);
            if(!user){
            res.status(404).json({ message: 'User not found!' });	
            } else {
            res.json({ message: 'User login!' });
        	}
        });

    });
router.post('/register',function(req, res) {

        var user = new users();
        user.username = req.body.username;  // set the user name (comes from the request)
        user.email = req.body.email;
        user.password = req.body.password;

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
