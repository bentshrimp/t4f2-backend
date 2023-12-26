const { Emotion, Emotion } = require('../../models/index');

async function addEmotion(type, id, user, mail, post_id) {
  try {
    const emotion = await Emotion.create({
      type: type,
      id,
      id,
      user: user,
      mail,
      mail,
      post_id,
      post_id,
    });
    return emotion;
  } catch (error) {
    throw error;
  }
}

async function deleteEmotion(id) {
  try {
    const emotion = await Emotion.destroy({ where: { id: id } });
    return emotion;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addEmotion,
  deleteEmotion,
};
