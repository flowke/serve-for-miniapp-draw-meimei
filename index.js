const Koa = require('koa');
const connDB = require('./db');
const appMiddlewares = require('./src/app');
const mongoose = require('mongoose');
const app = new Koa();

// 开启数据库连接
connDB();

// 注册所有中间件
app.use( appMiddlewares);


// app.use(  );

app.listen(3000,()=>{
  console.log('server is listening on port 3000');
});
