// module dependencies
var express = require('express'),
    passport = require('passport'),
    cors = require('cors');

module.exports = function (app, config) {
    app.set('port', config.app.port);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(require('connect-multiparty')());
    //app.use(express.methodOverride());
    //app.use(express.cookieParser('d1A76YqsMksz6Mf5mTJI1b530EXjP87d'));
    //app.use(express.session({ secret: 'd1A76YqsMksz6Mf5mTJI1b530EXjP87d' }));
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.use(express.session({ secret: 'securedsession' }));
    require('../config/Auth')(app);

    app.use(cors({
        credentials: true,
        origin: function(origin, callback){
           callback(null, true);
//            ((origin.indexOf('bchmn.com') !== -1) || (origin.indexOf('treatsforlife') !== -1) || (origin.indexOf('localhost') !== -1) || (origin.indexOf('127.0.0.1') !== -1))
        }
    }));
    app.use(app.router);
/*

    app.all('*/
/*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:9000");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        next();
    });
*/

    //specific environments
    switch (app.get('env')) {
        case 'production':
            app.use(express.errorHandler());
            break;
        case 'staging':
            break;
        default:
            app.use(express.errorHandler({
                dumpExceptions: true,
                showStack: true
            }));
    }

}