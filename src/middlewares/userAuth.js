const {checkSession} = require('../service/user');

module.exports = async (ctx, next)=>{

  let userID = checkSession(ctx);

  if(userID){
    await next();
  }else{
    ctx.body = {
      code: 444,
      msg: '未登陆 或 登录过期, 请重新登录'
    }
  }

};
