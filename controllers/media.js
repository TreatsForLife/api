var mongoose = require('mongoose'),
    Pet = mongoose.model('Pet'),
    Media = mongoose.model('Media');

exports.list = function (req, res) {
    Media.find({})
        .exec(function (err, pets) {
            res.send(pets);
        });
    ;
};

exports.last = function (req, res) {
    Media.find({})
        .limit(1)
        .sort('-_id')
        .exec(function (err, pets) {
            if (!err) res.send(pets[0]);
        });
    ;
};

exports.create = function (req, res) {
    /*
     if (!req.body.hasOwnProperty('pet') || !req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('url')) {
     res.send('missing param', 500);
     return;
     }
     */

    if (req.body.hasOwnProperty('pet')) {
        Pet.findById(req.body.pet, function (err, pet) {
            var media = new Media({ type: req.body.type, url: req.body.url });
            media.save(function (err, _media) {
                if (err) {
                    console.error(err.err);
                    res.send(err)
                }
                else {
                    pet.media.push(_media.id);
                    pet.save();
                    res.send(_media.url + ' [' + _media.type + '] has been added to ' + pet.name + '\'s media');
                }
            });
        });
    } else {
        Media.find({ext_id: req.body.ext_id }, function (err, _media) {
            if (_media.length == 0) {
                var media = new Media(req.body);
                media.save(function (err) {
                    if (err) {
                        console.error(err.err);
                        res.send(err)
                    }
                });
            }
        });

    }
};

exports.update = function (req, res) {

    if (req.body.hasOwnProperty('_id')) {
        Media.findById(req.params._id, function (err, media) {
            for (var m in media) {
                if (req.body[m]) {
                    media[m] = req.body[m];
                }
            }
            media.save(function (err, _media) {
                if (err) {
                    console.error(err.err);
                    res.send(err)
                }
                if (req.body.hasOwnProperty('pet')) {
                    Pet.findById(req.body.pet, function (err, pet) {
                        pet.media.push(req.params.id);
                        pet.save();
                        res.send(_media);
                    });
                }else{
                    res.send(_media);
                }
            });
        });
    }


};

exports.delete = function (req, res) {
    return Media.findById(req.params.id, function (err, media) {
        return media.remove(function (err) {
            if (!err) {
                var message = media.id + ' has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
};