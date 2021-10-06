let mongoose = require('mongoose');

// create a model class
let marketPrice = mongoose.Schema({
    symbol: String,
    price: Number
},
{
    collection: "marketprices"
});

module.exports = mongoose.model('Marketprice', marketPrice);