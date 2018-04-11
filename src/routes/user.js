const Router = require('koa-router');

const router = new Router();

router
  .post('userlogin', '/login', (ctx)=>{

  })
  .post('userregister', '/register', (ctx)=>{

  })
  .post('userlogout', '/logout', (ctx)=>{

  });

module.exports = router.routes();
