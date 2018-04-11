const Router = require('koa-router');
const User = require('../entity/user');
const axios = require('axios');

const router = new Router();

router.post('/login', (ctx)=>{
  console.log(ctx.reqbody);
  let {code} = ctx.reqbody;

  axios.get('https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
').



  ctx.body = {code: 0}
});

router.post('/register', async (ctx, next)=>{
  let {username, password} = ctx.reqbody;

  // 添加用户
  let userinfo = await User.create({username, password})
    .catch(err=>{
      if(err.username){

      }
      return err;
    });

  ctx.body = userinfo;

});

router.post('/logout', (ctx)=>{

});

module.exports = ()=>router.routes();
