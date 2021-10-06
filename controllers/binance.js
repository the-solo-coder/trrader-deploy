let axios = require('axios');
let express = require('express');
let Alert = require('../models/alert');
let mongoose = require('mongoose');

const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";

module.exports.displayPrice = (req, res, next) => {
    axios(apiUrl+req.params.symbol)
    .then(result => {
        res.status(200).send({ data: result.data} );
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
};

module.exports.deleteAlert = (req, res, next) => {
    let id = req.params.id;
    Alert.deleteOne({_id: id}, (err) => {
        if(err) { 
            console.log(err);
            res.end(err); 
        }else { 
            console.log("Successfully Deleted Alert");
            res.status(200).send({success:true, msg: 'Successfully Deleted Alert'}); 
        }
    });
};

module.exports.getAllAlerts = (req, res, next) => {
    
    Alert.find((err, alertList) =>{
        if(err){
            return console.error(err);
        }else{
            res.status(200).send({alertList});
        }
    })
};

module.exports.addAlert = (req, res, next) => {
    let newAlert = Alert(req.body);

    Alert.create(newAlert, (err, Alert) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.status(200).send({success: true, msg: 'Successfully Added New Alert'});
        }
    });
}

module.exports.getAlertToUpdate = (req, res) => {
    let id = req.params.id;
    console.log("HEREEEE " + id);
    Alert.findById({_id: id}, (err, alert) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(alert);
            res.status(200).send({alert});
        }
    })
}

module.exports.updateAlert = async (req, res) => {
    const {id: _id} = req.params;
    const alert = req.body;
    console.log(alert);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No alert with that id');
    const updatedAlert = await Alert.findByIdAndUpdate(_id, {...alert, _id}, {new: true});

    res.json(updatedAlert);
}


