const Router = require('koa-router');
const User = require('../entity/user');

const router = new Router();



router.post('/add', async (ctx)=>{

  let {
    latitude,
    longitude,
    title,
    address,
    incidents,
    userID
  } = ctx.reqbody;

  let markers = await User.addMark(userID, {
    latitude,
    longitude,
    title,
    address,
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

router.get('/get', async ctx=>{
  let {userID} = ctx.query;

  let markers = await User.getMarkers(userID);
  ctx.session.view = 9;
  ctx.body = {
    code: 0,
    data: markers
  }

})

module.exports = ()=>router.routes();
