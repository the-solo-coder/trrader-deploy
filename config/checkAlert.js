let axios = require('axios');
let Alert = require('../models/alert');
let sendEmail = require('./sendEmail');


module.exports = () =>
{
    const apiUrl = "https://api.binance.com/api/v3/ticker/price?symbol=";

    function deleteOne(id) {
        Alert.deleteOne({_id: id}, (err) => {
            if(err) { console.log(err); }
            else { console.log("Successfully Deleted Alert"); }
      });
    }

    /*
    //checking my alert conditions ( ** 1 - Greater than > ** and ** 2 Less than < ** )
    setInterval(() => {
        Alert.find((err, allAlerts) => {
            if(err) {return console.log(err);}
            else{
                allAlerts.forEach(element => {
                   axios(apiUrl+element.symbol)
                   .then(result => {
                       if(element.condition == 1 && element.value > result.data.price){
                           console.log(`My price alert($${element.value}) is more than the actual price of BTC (${result.data.price})`);
                           sendEmail(`My price alert($${element.value}) 
                           is more than the actual price of BTC ($${result.data.price})`, "a@hotmail.com");
                           deleteOne(element._id);
                       }
                       if(element.condition == 2 && element.value < result.data.price){
                            console.log(`My price alert($${element.value}) is less than the actual price of BTC ($${result.data.price})`);
                            sendEmail(`My price alert($${element.value}) 
                            is less than the actual price of BTC ($${result.data.price})`, "a@hotmail.com");
                            deleteOne(element._id);
                       }
                   })
                   .catch((err)=> {
                       console.log(err);
                   })
               });
            }
        });
    }, 10000);
    */

    //10-minute alert TR-26 - currently working
    /* const test2 = ()=>{
        const bitCoinUSD = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT";
        setInterval(() => {
        axios(bitCoinUSD).then(result => {
            console.log(`BTCUSDT is currently : ${result.data.price}`);
        })
        .catch((err) => {
            console.log(err); 
         });}, 100000); //10-minute timer
    }*/
}






