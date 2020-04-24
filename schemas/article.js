var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({
    companyname: String,
    desc: String,
    job: String,
    daiyu: String,
    xingzi: String,
    address: String,
    yaoqiu: String,
    fuli: String,
    imgUrl: String,
    times: String
});
