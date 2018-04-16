const Router = require('koa-router');
const {Schema} = require('mongoose');
const User = require('../entity/user');
const userService = require('../service/user');
const axios = require('axios');

const router = new Router();

let {ObjectId} = Schema.Types;

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

  ctx.body = {
    code: 0,
    msg: '登录成功',
    data: user
  };
});

router.post('/register', async (ctx, next)=>{
  let {id} = ctx.reqbody;

  // 添加用户
  let userinfo = await User.create({_id: id })
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
