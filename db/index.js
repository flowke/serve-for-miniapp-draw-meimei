const mongoose = require('mongoose');
const {
  host,
  port,
  database,
  username,
  password
} = require('./dbConfig');

let auth = username && password && `${username}:${password}@`,
    databaseString = database 

console.log(`mongodb://${auth||''}${host}:${port}/${database}`);
mongoose.connect(`mongodb://${auth||''}localhost:${host}/${database}`);

let db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('dones');
});
