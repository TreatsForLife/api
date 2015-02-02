//module dependencies
var cors = require('cors'),
    services = require('../controllers/services'),
    pets = require('../controllers/pets'),
    users = require('../controllers/users'),
    media = require('../controllers/media'),
    treats = require('../controllers/treats'),
    donations = require('../controllers/donations'),
    kennels = require('../controllers/kennels');
    mongoose = require('mongoose'),
    User = mongoose.model('User');
    comments = require('../controllers/comments');


module.exports = function (app) {
    //cors pre-flight
    app.options('*', cors());

    // services
    app.get('/ping', services.ping);
    app.namespace('/service', function () {
        app.get('/ping', services.ping);
        app.get('/test_push/:reg_id', services.push_notification);
        app.get('/test_push_ios/:token', services.push_notification_ios);
    });


    // pets
    app.get('/', pets.list);
    app.get('/pets', pets.list);
    app.namespace('/pet', function () {
        app.get('/', pets.list);
        app.get('/lonely', pets.lonely);
        app.get('/adopted', pets.adopted);
        app.post('/', pets.create);
        app.get('/:id', pets.get);
        app.put('/:id', pets.update);
        app.del('/:id', pets.delete);
    });


    //users
    app.namespace('/user', function () {
        app.get('/', users.list);
        app.get('/:id', users.get);
        app.post('/', users.create);
        app.put('/:id', users.update);
        app.del('/:id', users.delete);
    });

    //media
    app.namespace('/media', function () {
        app.get('/', media.list);
        app.get('/last', media.last);
        app.get('/:id', media.get);
        app.post('/', media.create);
        app.put('/:id', media.update);
        app.del('/:id', media.delete);
    });

    //kennels
    app.namespace('/kennel', function () {
        app.get('/', kennels.list);
        app.get('/:id', kennels.get);
        app.post('/', kennels.create);
        app.put('/:id', kennels.update);
        app.del('/:id', kennels.delete);
    });

    //treats
    app.namespace('/treat', function () {
        app.get('/', treats.list);
        app.get('/:id', treats.get);
        app.post('/', treats.create);
        app.put('/:id', treats.update);
        app.del('/:id', treats.delete);
    });

    //donations
    app.namespace('/donation', function () {
        app.get('/', donations.list);
        app.get('/given', donations.given);
        app.get('/pending', donations.pending);
        app.get('/:id', donations.get);
        app.post('/', donations.create);
        app.post('/approve', donations.approve);
        app.put('/:id', donations.update);
        app.del('/:id', donations.delete);
    });

    app.namespace('/comment', function () {
        app.post('/', comments.create);
        app.get('/:id', comments.commentsForPet);
    });

    app.get('/loggedin', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });
    // route to log in
    app.post('/login', passport.authenticate('local'), function (req, res) {
        res.send(req.user);
    });
    app.post('/register', function (req, res) {
        User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password, function (err, account) {
            if (err) {
                res.status(400).send(err);
            }
            else
                res.send(account)
            //res.send(req.isAuthenticated() ? req.user : '0');
        });
    });


// route to log out
    app.post('/logout', function (req, res) {
        req.logOut();
        res.send(200);
    });
};
