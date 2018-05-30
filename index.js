const Koa = require('koa');
const connDB = require('./db');
const appMiddlewares = require('./src/app');
const session = require('koa-session2');
const MongoStore = require("koa-session2-mongostore");
const mongoose = require('mongoose');
const dbConfig = require('./db/dbConfig');
const app = new Koa();



// 开启数据库连接
connDB();

// 注册所有中间件
app
  .use( session({
    maxAge: 3600*2 * 1000,
    store: new MongoStore({

      url: dbConfig.url,
      dbName: dbConfig.options.dbName,
      maxAge: 3600*2
    })
  }))
  .use( appMiddlewares);

// app.use(  );

app.listen(3000,()=>{
  console.log('server is listening on port 3000');
});
