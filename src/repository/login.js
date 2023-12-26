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
async function findUser() {
  const users = await User.findAll({ where: { pwd: 'pwd' } });
  return users;
}

async function updateNickname(mail, nickname, pwd) {
  try {
    const user = await User.update(
      { nickname: nickname },
      { where: { mail: mail } }
    );
  } catch (error) {
    console.log(error);
  }
}

async function updatePwd(mail, nickname, pwd) {
  try {
    const user = await User.update({ pwd: pwd }, { where: { mail: mail } });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, findUser, updateNickname, updatePwd };
