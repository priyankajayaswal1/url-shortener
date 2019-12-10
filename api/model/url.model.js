var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlDataSchema = new Schema({
    long_url: {
        type: String,
        required : true
    },
    short_url: {
        type: String,
        required : true
    },
    added_on: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UrlData', urlDataSchema, 'UrlData');
