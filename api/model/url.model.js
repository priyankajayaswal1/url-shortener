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
    visit_count: {
        type: Number,
        default: 0
    },
    added_on: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UrlData', urlDataSchema, 'UrlData');
