let mongoose = require('mongoose');

// create a model class
let alertModel = mongoose.Schema({
    
    symbol: String,
    condition: { type: Number, min: 1, max: 2, required: true },
    value: Number,
    creator: String
}, 
{
    collection: "alerts"
});

module.exports = mongoose.model('Alert', alertModel);







