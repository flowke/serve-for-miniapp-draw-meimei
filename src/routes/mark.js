const Router = require('koa-router');
const User = require('../entity/user');
const userAuth = require('../middlewares/userAuth');
const router = new Router();

// 获取 marker 信息
router.get('/get', async ctx=>{
  let {userID} = ctx.query;

  try {
    let res = await User.getMarkers(userID);

    ctx.body = {
      code: 0,
      data: res.markers
    }
  }catch(e){
    ctx.body = {
      code: 1,
      meg: '获取 markers 失败'
    }
  }
});

// 往下的 action 需要用户认证
router.use(userAuth);

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

router.post('/delete', async ctx=>{
  let {
    ids
  } = ctx.reqbody;

  let {userID} = ctx.session;

  try{
    let mks = await User.deleteMarkers(userID, ids);

    ctx.body = {
      code: 0,
      data: mks
    }
  }catch(e){
    console.log(e);
    ctx.body = {
      code: 1,
      msg: '删除失败'
    }
  }
});

router.post('/edit-address', async ctx=>{
  let {
    markerID,
    title,
    address,
    latitude,
    longitude,
  } = ctx.reqbody;

  let {userID} = ctx.session;

  try{
    let markers = await User.editAddress({
      markerID,
      title,
      address,
      latitude,
      longitude,
      userID
    });

    ctx.body = {
      code: 0,
      msg: '更新地址成功',
      data: markers
    };

  }catch(e){
    ctx.body = {
      code: 1,
      msg: '更新地址失败'
    };
  }
});

router.post('/edit-event', async ctx=>{
  let {
    markerID,
    eventID,
    incidentTime,
    incidentDesc
  } = ctx.reqbody;

  let {userID} = ctx.session;

  try{
    let markers = await User.editEvent({
      ...ctx.reqbody,
      userID
    });

    ctx.body = {
      code: 0,
      msg: '修改 markers 成功',
      data: markers
    };

  }catch(e){
    console.log(e);
    ctx.body={
      code: 1,
      msg: e
    }
  }
});

router.post('/add-event', async ctx=>{
  let {
    markerID,
    incidentTime,
    incidentDesc
  } = ctx.reqbody;

  let {userID} = ctx.session;

  try{
    let markers = await User.addEvent({
      ...ctx.reqbody,
      userID
    });

    ctx.body = {
      code: 0,
      msg: '添加 markers 成功',
      data: markers
    };

  }catch(e){
    ctx.body={
      code: 1,
      msg: e
    }
  }
});

router.post('/delete-event', async ctx=>{
  let {eventID, markerID} = ctx.reqbody;
  let {userID} = ctx.session;

  try{

    let mks = await User.deleteEvent(userID, markerID, eventID);

    ctx.body = {
      code: 0,
      data: mks
    };

  }catch(e){

    ctx.body = {
      code: 1,
      msg: '删除失败'
    }
  }

});

module.exports = ()=>router.routes();
