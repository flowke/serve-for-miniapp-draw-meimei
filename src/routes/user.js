const Router = require('koa-router');
const User = require('../entity/user');
const axios = require('axios');

const router = new Router();

router.post('/login', async (ctx)=>{

  let {code} = ctx.reqbody;

  let ret = await axios.get('https://api.weixin.qq.com/sns/jscode2session' ,{
    params:{
      appid: '',
      secret: '',
      js_code: code,
      grant_type: 'authorization_code'
    }
  });

  console.log(ret.data);

  ctx.body = ret.data;
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
