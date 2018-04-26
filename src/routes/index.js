const Router = require('koa-router')

const userRoutes = require('./user');
const markRoutes = require('./mark');

const router = new Router();

router
  .use('/user', userRoutes())
  .use('/mark', markRoutes())
;

module.exports = ()=>router.routes();
