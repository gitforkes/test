var express = require('express');

var swig = require('swig');

var mongoose = require('mongoose');

var bodyPar = require('body-parser');

var app = express();

var bodyParser = require('body-parser');
//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));

//设置模板引擎
app.engine('html', swig.renderFile);

app.set('views', './views');

app.set('view engine', 'html');

app.use(bodyPar.urlencoded({extended: true}));

//划分路由模块
app.use('/admin', require('./routers/admin'));

app.use('/api', require('./routers/api'));

app.use('/', require('./routers/main'));

//数据库连接
mongoose.connect('mongodb://localhost:27017/hr', function (err) {
    if (err) {
        console.log('数据库连接失败' + err);
    } else {
        console.log('数据库连接成功, ok!');
        //端口监听
        app.listen(8081);
    }
});




































