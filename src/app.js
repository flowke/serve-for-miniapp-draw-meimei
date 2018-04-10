const Router = require('koa-router');
const routes = require('./routes');

const appRouter = new Router();

appRouter
  .use( routes );

module.exports = appRouter.routes();
