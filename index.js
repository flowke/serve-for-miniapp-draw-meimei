const Koa = require('koa');
const connDB = require('./db');
const appMiddlewares = require('./src/app');

const app = new Koa();

// 开启数据库连接
connDB();


app.use(appMiddlewares);

app.listen(3000,()=>{
  console.log('server is listening on port 3000');
});
