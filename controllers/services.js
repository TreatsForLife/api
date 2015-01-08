var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Pet = mongoose.model('Pet'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media'),
    User = mongoose.model('User');

var gcm = require('node-gcm');
var apn = require('apn');

exports.push_notification = function (req, res) {

    var reg_id = req.params.reg_id;

// create a message with default values
//    var message = new gcm.Message();

// or with object values
    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            message: "PhoneGap Build rocks!",
            msgcnt: "1",
            soundname: "woof.mp3"
        }
    });

    var sender = new gcm.Sender('AIzaSyANf_joGDhynZs0YK7Q4IbMjrKnRVC9kSE');
    var registrationIds = [];

// OPTIONAL
// add new key-value in data object
//    message.addDataWithKeyValue('key1', 'message1');
//    message.addDataWithKeyValue('key2', 'message2');

// or add a data object
//    message.addDataWithObject({
//        key1: 'message1',
//        key2: 'message2'
//    });

// or with backwards compability of previous versions
//    message.addData('key1', 'message1');
//    message.addData('key2', 'message2');


//    message.collapseKey = 'demo';
//    message.delayWhileIdle = true;
//    message.timeToLive = 3;
//    message.dryRun = true;
// END OPTIONAL

// At least one required
    registrationIds.push(reg_id);

    /**
     * Params: message-literal, registrationIds-array, No. of retries, callback-function
     **/
    sender.send(message, registrationIds, 4, function (err, result) {
        console.log(result);
        res.send(result);
    });
};

exports.push_notification_ios = function (req, res) {

    var token = req.params.token;

    var options = {
        "passphrase": 'treatsfor1M$'
    };

    var apnConnection = new apn.Connection(options);

    var myDevice = new apn.Device(token);

    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
    note.payload = {'messageFrom': 'Caroline'};

    var result = apnConnection.pushNotification(note, myDevice);

/*
    var options = {
        "batchFeedback": true,
        "interval": 1000,
        "production": false,
//            "cert": dev_cert_path,
//            "key": dev_key_path,
        "passphrase": 'treatsfor1M$'
    };

    var feedback = new apn.Feedback(options);
    feedback.on("feedback", function (devices) {
        devices.forEach(function (item) {
            console.log("iOS Item received", item);

            // Do something with item.device and item.time;
        });
    });
*/

    console.log(result);
    res.send(result);
};

/*
 */


exports.ping = function (req, res) {
    res.send('connected');
  }