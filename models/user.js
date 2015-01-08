//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Schema = mongoose.Schema;


//schema
var userSchema = new Schema({
    name     : { type: String, default: 'New User', required: true },
    email    : { type: String, default: 'New@User.com', required:true },
    image    : { type: String, default: ' ', required:true },
    fb_id    : { type: String, default: ' ', required:true },
    fb_at    : { type: String, default: ' ', required:true },
    pet      : { type: Schema.Types.ObjectId, default: null, ref: 'Pet' },
    push_token    : { type: String, default: ' ', required:false },
    platform    : { type: String, default: 'none', required:true }
});
userSchema.plugin(timestamps);
userSchema.plugin(passportLocalMongoose);

mongoose.model('User', userSchema);