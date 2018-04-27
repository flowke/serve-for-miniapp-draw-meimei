const mongoose = {Schema} = require('mongoose');
const statics = require('./userStatics');

let TP = Schema.Types;

let eventSchema = new Schema({
  time: String,
  content: String
});

let markSchema = new Schema({
  title: String,
  address: String,
  latitude: String,
  longitude: String,
  events:[eventSchema]
});


const userSchema = new Schema({
  openid: {
    type: String,
    require: true
  },
  friends: [{type: TP.ObjectId, ref: 'User'}],
  markers: [markSchema]
},{
  timestamps: true,
});

userSchema.statics = statics;


const User = mongoose.model('User', userSchema);

module.exports = User;
