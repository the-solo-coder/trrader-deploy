let express = require('express');
let router = express.Router();

// enable jwt
let jwt = require('jsonwebtoken');

let passport = require('passport');

// Connect to book controller
let marketpriceController = require('../controllers/marketprice');

/* GET Route for the Book List page - READ operation. */
router.get('/', marketpriceController.displayMarketpriceList);
//router.get('/', passport.authenticate('jwt', {session: false}), bookController.displayBookList);

/* POST Route for processing the Add page - CREATE operation. */
router.post('/add', passport.authenticate('jwt', {session: false}), marketpriceController.processAddPage);

/* POST Route for processing the Edit page - UPDATE operation. */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), marketpriceController.processEditPage);

/* GET Route to perform Deletion - DELETE operation. */
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), marketpriceController.performDelete);

module.exports = router;