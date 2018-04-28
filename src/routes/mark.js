const Router = require('koa-router');
const User = require('../entity/user');
const userAuth = require('../middlewares/userAuth');
const router = new Router();

// 往下的 action 需要用户认证
router.use(userAuth);

router.get('/get', async ctx=>{
  let {userID} = ctx.query;

  try {
    let markers = await User.getMarkers(userID);
    ctx.body = {
      code: 0,
      data: markers
    }
  }catch(e){
    ctx.body = {
      code: 1,
      meg: '获取 markers 失败'
    }
  }

});

router.post('/add', async (ctx)=>{

  let {
    latitude,
    longitude,
    title,
    address,
    incidents,
  } = ctx.reqbody;

  let {userID} = ctx.session;

  try{
    let markers = await User.addMark(userID, {
      latitude,
      longitude,
      title,
      address,
      events: incidents,
    });

    ctx.body = {
      data: markers,
      code: 0,
      msg: '保存 marker 成功'
    }

  }catch(e){
    ctx.body = {
      code: 1,
      msg: '保存 marker 失败'
    }
  }

});

module.exports = ()=>router.routes();
