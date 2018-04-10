const Koa = require('koa');
const db = require('./db');
const app = new Koa();



app.listen(3000,()=>{
  console.log('server is listening on port 3000');
});
