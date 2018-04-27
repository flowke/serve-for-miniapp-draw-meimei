const Router = require('koa-router');
const koaBody = require('koa-body');
const routes = require('./routes');

const appRouter = new Router();

appRouter
  .use(koaBody(), async (ctx, next)=>{
    ctx.reqbody = ctx.request.body;
    await next()
  })
  .use( routes() )
  .use( appRouter.allowedMethods() );

module.exports = appRouter.routes();
