const Router = require('koa-router');
const User = require('../entity/user');

const router = new Router();

router.post('/add', async (ctx)=>{

  let {
    markTitle,
    markAddress,
    incidents,
    userID
  } = ctx.reqbody;

  let markers = await User.addMark(userID, {
    title: markTitle,
    address: markAddress,
    events: incidents,
  });

  console.log(markers);

  if(markers){
    ctx.body = {
      data: markers,
      code: 0,
      msg: '保存 marker 成功'
    }
  }else{
    ctx.body = {
      code: 1,
      msg: '保存 marker 失败'
    }
  }

});


module.exports = ()=>router.routes();
