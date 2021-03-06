//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

//schema
var petSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    age: { type: String, required: false },
    gender: { type: String, required: true },
    media: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
    kennel: { type: Schema.Types.ObjectId, ref: 'Kennel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});
petSchema.plugin(timestamps);

mongoose.model('Pet', petSchema);