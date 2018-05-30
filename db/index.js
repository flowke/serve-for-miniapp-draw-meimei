const mongoose = require('mongoose');
const {
  url,
  options
} = require('./dbConfig');


module.exports = ()=>{
  mongoose.connect(url, options)
    .then(ret=>{
      console.log('connecting to database successfully');
    })
    .catch(err=>{
      console.log(err);
    });
};


module.exports.mon = mongoose;
