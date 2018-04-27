const Router = require('koa-router');
const {Schema} = require('mongoose');
const User = require('../entity/user');
const userService = require('../service/user');
const axios = require('axios');

const router = new Router();

let {ObjectId} = Schema.Types;

router.use( async (ctx, next)=>{
  let userID = userService.checkSession();

  if(userID){
    await next();
  }else{
    res.body = {
      code: 444,
      msg: '登录过期, 请重新登录'
    }
  }


})

router.post('/login', async (ctx)=>{

  let {code} = ctx.reqbody;

  // 取得 openid session_key
  let {data} = await axios.get('https://api.weixin.qq.com/sns/jscode2session' ,{
    params:{
      appid: 'wx0a6982103c1d0067',
      secret: '84e778c6d7622c57a037ba95ead390d7',
      js_code: code,
      grant_type: 'authorization_code'
    }
  });

  // 通过 openid 查找用户信息
  let user = await userService.findUserByOpenid(data.openid);

  // 如果没有用户信息
  // 添加一个用户到数据库
  if(user===null){
    user = await userService.addUser(data.openid);
  };

  await userService.setSession(ctx, user.id)

  ctx.body = {
    code: 0,
    msg: '登录成功',
    data: user
  };
});

router.post('/logout', async (ctx)=>{
  console.log(ctx.reqbody);
  console.log('/outs');
  let a = await Promise.resolve('fds');
  ctx.body = {a}
});

module.exports = ()=>router.routes();
