const User = require('../entity/user');

function setSession(ctx, userID) {
  ctx.session.userID = userID;
}
function checkSession(ctx) {
  return ctx.session.userID;
}

module.exports = {
  setSession,
  checkSession
};
