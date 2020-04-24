var express = require('express');

var router = express.Router();

var User = require('../models/User');

var multer = require('multer');

var fs = require('fs');

var pathLib = require('path');

var articles = require('../models/Article');

var objmulter = multer({dest: './public/images'});

router.use(objmulter.any());

//后台管理页面
router.get('/login', function (req, res, next) {
    //渲染页面
    res.render('login.html');
});


//用户删除
router.get('/category/del', function (req, res, next) {
    var id = req.query.id;
    User.deleteOne({
        _id: id
    }).then(function () {
        res.end();
    });
});


//用户信息修改
router.get('/category/edit', function (req, res, next) {
    var id = req.query.id;
    var val = req.query.val;
    User.find({
        _id: id
    }).updateOne({
        usernote: val
    }).then(function () {
        res.json({code: 200});
        res.end();
    })
});

//信息发布
router.post('/article/upload', function (req, res, next) {
    var oDate = new Date();
    var oYear = oDate.getFullYear();
    var oMon = oDate.getMonth() + 1;
    var oDay = oDate.getDate();
    var times = oYear + '/' + oMon + '/' + oDay;
    var companyname = req.body.name;
    var desc = req.body.description;
    var job = req.body.job;
    var daiyu = req.body.scale;
    var xingzi = req.body.salary;
    var address = req.body.address;
    var yaoqiu = req.body.conditions;
    var fuli = req.body.welfare;
    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;

    fs.rename(req.files[0].path, newName, function (err) {
        if (err) {
            console.log(err);
        } else {
            var art = new articles({
                companyname: companyname,
                desc: desc,
                job: job,
                daiyu: daiyu,
                xingzi: xingzi,
                address: address,
                yaoqiu: yaoqiu,
                fuli: fuli,
                imgUrl: newName,
                times: times
            });
            res.send({msg: '发布成功!', code: 200});
            res.end();
            return art.save();
        }
    })
});

//搜索
router.get('/search', function (req, res, next) {
    articles.find({
        address: req.query.condition
    }).then(function(data){
        res.json(data);
        res.end();
    })
});

module.exports = router;