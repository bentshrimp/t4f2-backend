const { User } = require('../../models/index');

async function createUser(mail, nickname, pwd) {
  try {
    const user = await User.create({
      mail: mail,
      nickname: nickname,
      pwd: pwd,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// for test
async function findUser(email) {
  const users = await User.findAll({ where: { mail: email } });
  return users;
}

async function updateNickname(mail, nickname) {
  try {
    const user = await User.update(
      { nickname: nickname },
      { where: { mail: mail } }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function updatePwd(mail, pwd) {
  try {
    const user = await User.update({ pwd: pwd }, { where: { mail: mail } });
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, findUser, updateNickname, updatePwd };
