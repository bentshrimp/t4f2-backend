const { User } = require('../../models/index');

async function createUser(email, nickname, password, salt) {
  try {
    const user = await User.create({
      email: email,
      nickname: nickname,
      password: password,
      salt: salt,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// for test
async function findUser(email) {
  const user = await User.findOne({ where: { email: email } });
  return user;
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
