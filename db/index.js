const mongoose = require('mongoose');
const {
  url,
  dbName
} = require('./dbConfig');

let options = {
  dbName
};

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
