var mongoose = require('mongoose'),
    Kennel = mongoose.model('Kennel');

exports.list = function(req, res) {
    Kennel.find({})
        .exec(function (err, Kennels) {
            res.send(Kennels);
        });
};

exports.create = function(req, res) {

    var kennel = new Kennel(req.body);
    kennel.save(function (err, kennel) {
        if (err){
            console.error(err.name);
            res.send(err)
        }
        else
            res.send(kennel);
    });
};

exports.get = function(req, res) {
    Kennel.findById(req.params.id)
        .exec(function (err, kennel) {
            res.send(kennel);
        });
};

exports.update = function(req, res) {
    Kennel.findById(req.params.id, function (err, kennel) {
        for (var k in req.body){
            if (req.body[k])
                kennel[k] = req.body[k];
        }
        return kennel.save(function (err) {
            res.send(kennel);
            console.log(err || kennel);
        });
    });
};

exports.delete = function(req, res){
    return Kennel.findById(req.params.id, function (err, Kennel) {
        return Kennel.remove(function (err) {
            if (!err) {
                var message = Kennel.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}