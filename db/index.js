const mongoose = require('mongoose');
const url = require('./dbConfig');


module.exports = ()=>{
  mongoose.connect(url)
    .then(ret=>{
      console.log('connecting to database successfully');
    })
    .catch(err=>{
      console.log(err);
    });
};


module.exports.mon = mongoose;
