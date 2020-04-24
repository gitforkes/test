var mongoose = require('mongoose');

//用户表结构
module.exports = new mongoose.Schema({
    username: String,
    password: String,
    company: String,
    mob: String,
    vxnumber: String,
    usernote: String,
    idcard: String,
    times: String,
    address: String
});
