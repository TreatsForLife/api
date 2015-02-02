//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var commentSchema = new Schema({
   text     : { type: String, default:'', required: true },
    pet      : { type: Schema.Types.ObjectId, default: null, ref: 'Pet' },
    user      : { type: Schema.Types.ObjectId, default: null, ref: 'User' }
});
commentSchema.plugin(timestamps);

mongoose.model('Comment', commentSchema);