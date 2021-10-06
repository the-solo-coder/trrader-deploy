let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// enable jwt
let jwt = require('jsonwebtoken');

// connect to our marketprice Model
let Marketprice = require('../models/marketprice');

module.exports.displayMarketpriceList = (req, res, next) => {
    Marketprice.find((err, marketpriceList) => {
        if (err) {
            return console.error(err);
        } else {
            res.json(marketpriceList);
        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
   res.json({success: true, msg: 'Succesfully Displayed Add Page'});
}

module.exports.processAddPage = (req, res, next) => {
    let newMarketprice = Marketprice({
        "symbol": req.body.symbol,
        "price": req.body.price
    });

    Marketprice.create(newMarketprice, (err, Marketprice) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.json({success: true, msg: 'Successfully Added New Marketprice'});
        }
    });
}

module.exports.displayEditPage =  (req, res, next) => {
    let id = req.params.id;

    Marketprice.findById(id, (err, marketpriceToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            res.json({success: true, msg: 'Successfully Displayed Marketprice to Edit', marketprice: marketpriceToEdit});
        }
    })
}

module.exports.processEditPage =  (req, res, next) => {
    let id = req.params.id;

    let updatedMarketprice = Marketprice({
        "_id": id,
        "symbol": req.body.symbol,
        "price": req.body.price
    });

    Marketprice.updateOne({_id: id}, updatedMarketprice, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
            res.json({success: true, msg: 'Successfully Edited MarketPrice', marketprice: updatedMarketprice});
        }
    });

}

module.exports.performDelete =  (req, res, next) => {
    let id = req.params.id;

    Marketprice.deleteOne({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);    
        } else {
             res.json({success: true, msg: 'Successfully Deleted Marketprice'});
        }
    });
}