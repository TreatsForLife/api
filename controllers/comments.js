var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');
//
//exports.list = function(req, res) {
//    Kennel.find({})
//        .exec(function (err, Kennels) {
//            res.send(Kennels);
//        });
//};

exports.create = function(req, res) {

    var comment = new Comment(req.body);
    comment.save(function (err, comment) {
        if (err){
            console.error(err.name);
            res.send(err)
        }
        else
            res.send(comment);
    });
};

exports.get = function(req, res) {
    Comment.findById(req.params.id)
        .exec(function (err, comment) {
            res.send(comment);
        });
};

exports.commentsForPet = function(req, res) {
    Comment.find({pet:req.params.id},"user user.name text", function(err,comments){
            res.send(comments);
        });
};

//
//exports.update = function(req, res) {
//    Kennel.findById(req.params.id, function (err, kennel) {
//        for (var k in req.body){
//            if (req.body[k])
//                kennel[k] = req.body[k];
//        }
//        return kennel.save(function (err) {
//            res.send(kennel);
//            console.log(err || kennel);
//        });
//    });
//};
//
//exports.delete = function(req, res){
//    return Kennel.findById(req.params.id, function (err, Kennel) {
//        return Kennel.remove(function (err) {
//            if (!err) {
//                var message = Kennel.name + ' [' + req.params.id + '] has been deleted successfully';
//                console.log(message);
//                res.send(message);
//            } else {
//                console.log(err);
//                res.send(err.message, 500);
//            }
//        });
//    });
//}