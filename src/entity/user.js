const mongoose = require('mongoose');

let Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '必须填写用户名'],
    unique: true,
    minlength: [4, '最小长度是4']
  },
  password: {
    type: String,
    required: [true, '必须填写密码']
  },
},{
  timestamps: true,
});


const User = mongoose.model('User', userSchema);


module.exports = User;


new Promise(resolve=>{

});
