const mongoose = {Schema} = require('mongoose');

let TP = Schema.Types;

const userSchema = new mongoose.Schema({
  openid: {
    type: String,
    require: true
  },
  friends: [TP.Mixed],
  symbols: [TP.Mixed]
},{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
