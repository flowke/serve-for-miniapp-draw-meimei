const User = require('../entity/user');

// 注意, 要么是 0, 要么是 1,
let userField = {
  _id: 1,
  createdAt: 1,
  updatedAt: 1,
  friends: 1,
  symbols: 1
};

// 通过 id查询用户信息
function findUserById(id) {
  return User.findById(id, userField ).exec();
}

// 添加一个用户
function addUser(openid) {

  return User.create({openid}).then(user=>{

    let out = {};
    for(let f in userField){
      if(userField[f]){
        out[f] = user[f];
      }
    }
    return out;
  });

}

// 通过 openid查询用户信息
function findUserByOpenid(openid) {
  return User.findOne({openid}, userField).exec();
}

function setSession(ctx, userID) {
  ctx.session.userID = userID;
}
function checkSession(ctx) {
  return ctx.session.userID;
}

module.exports = {
  findUserById,
  addUser,
  findUserByOpenid,
  setSession,
  checkSession
};
