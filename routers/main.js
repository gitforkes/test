var express = require('express');

var router = express.Router();

var Artilce = require('../models/Article');

router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.get('/article', function (req, res, next) {
    res.render('content.html');
});

router.get('/register', function (req, res, next) {
    res.render('reg.html');
});




module.exports = router;