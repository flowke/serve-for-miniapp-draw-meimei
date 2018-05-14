const Router = require('koa-router');
const User = require('../entity/user');
const userService = require('../service/user');
const axios = require('axios');

const router = new Router();

router.get('/get-profile', async ctx=>{
  let {userID} = ctx.query;
  try {
    let user = await User.getProfile(userID);
    ctx.body = {
      code: 0,
      data: user
    }
  }catch(e){

  }

});

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

  userService.setSession(ctx, user.id);

  ctx.body = {
    code: 0,
    msg: '登录成功',
    data: user
  };

});

router.post('/save-userinfo', async ctx=>{
  let {userID} = ctx.session;
  let {
    userInfo
  } = ctx.reqbody;

  try{
    let rt = await User.saveUserInfo(userID, userInfo);
    if(rt.ok===1){
      ctx.body = {
        code: 0,
        data: rt
      }
    }
  }catch(e){
    console.log(e);
  }

})

router.post('/checkLogin', async (ctx)=>{
  let userID = userService.checkSession(ctx);
  if(userID){
    ctx.body = {
      code: 0,
      msg: '登录有效'
    };
  }else{
    ctx.body = {
      code: 1,
      msg: '需重新登录'
    }
  }
});

module.exports = ()=>router.routes();
