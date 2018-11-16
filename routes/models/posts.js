var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', new Schema({
    user_id:String,
    price: Number,
    url: String,
    lat: Number,
    lng: Number,
    phone: String,
    created_at: { type: String, default: moment().format() }
}));