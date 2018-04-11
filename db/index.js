const mongoose = require('mongoose');
const {
  host,
  port,
  database,
  username,
  password
} = require('./dbConfig');

let options = {
  user: username,
  pass: password,
  dbName: database
};

module.exports = ()=>{
  mongoose.connect(`mongodb://${host}:${port}`, options)
    .then(ret=>{
      console.log('connecting to database successfully');
    })
    .catch(err=>{
      console.log(err);
    });
};


module.exports.mon = mongoose;
