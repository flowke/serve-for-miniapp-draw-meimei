const User = require('../entity/user');

// 通过id查询用户信息
function findUserById(id) {
  return User.findById(id).exec();
}

// 添加一个用户
function addUser(id) {
  return User.findById(id).exec();
}


module.exports = {
  findUserById,
  addUser
};
