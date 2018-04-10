const Router = require('koa-router');
const userRoutes = require('./user');


const router = new Router();

router
  .use('/user', userRoutes)
;

module.exports = router.routes();
