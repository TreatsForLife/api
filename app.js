// module dependencies
var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/environments')[env],
    utils = require('./config/utils'),
    passport = require('passport'),
    mongoose = require('mongoose')

require('express-namespace');

// mongodb connection
mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log('db connected successfully'); });

// bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js'))
        require(models_path + '/' + file)
});

var app = express();
// express settings
require('./config/express')(app, config);

// bootstrap routes
require('./config/routes')(app);

// web connection
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// expose app
exports = module.exports = app

