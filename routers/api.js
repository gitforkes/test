var express = require('express');

var router = express.Router();

var User = require('../models/User');

var Artilce = require('../models/Article');

//制定统一返回格式
var resData;
router.use(function (req, res, next) {
    resData = {
        code: 0,
        msg: ''
    };
    next();
});

//注册
router.post('/user/register', function (req, res, next) {
    console.log(req.body);
    var username = req.body.name;
    var phoneNumber = req.body.phoneNumber;
    var pass = req.body.password;
    var vxnumber = req.body.vxnumber;
    var times = req.body.times;
    var company = req.body.company;
    var idcard = req.body.idcard;
    var usernote = req.body.usernote;
    var address = req.body.address;

    if (username === '') {
        resData.code = 1;
        resData.msg = '用户名不能为空';
        res.json(resData);
        return;
    }

    if (phoneNumber === '') {
        resData.code = 2;
        resData.msg = '手机号不能为空';
        res.json(resData);
        return;
    }

    if (pass === '') {
        resData.code = 3;
        resData.msg = '密码不能为空';
        res.json(resData);
        return;
    }

    var user = new User({
        username: username,
        password: pass,
        company: company,
        mob: phoneNumber,
        vxnumber: vxnumber,
        idcard: idcard,
        times: times,
        usernote: usernote,
        address: address
    });
    res.end();
    return user.save();
});

//已注册用户信息展示
router.get('/admin/getuserdata', function (req, res, next) {
    User.find().then(function (users) {
        res.json(users);
        res.end();
    })
});

//获取全部已发布的信息
router.get('/admin/getarticledata', function (req, res, next) {
    Artilce.find().then(function (arts) {
        res.json(arts);
        res.end();
    })
});

//信息管理-删除
router.get('/admin/delarticle', function (req, res, next) {
    var id = req.query.id;
    console.log(id);
    Artilce.deleteOne({
        _id: id
    }).then(function () {
        res.end();
    });
});

//获取文章详情
router.get('/admin/article', function (req, res, next) {
    var id = req.query.id;
    Artilce.findOne({
        _id: id
    }).then(function (data) {
        res.send(data);
        res.end();
    });
});

module.exports = router;