const { Music } = require('../../models/index');

async function addMusic(title, artist, mail, post_id) {
  try {
    const music = await Music.create({
      title: title,
      artist: artist,
      user_mail: mail,
      post_id: post_id,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateMusic(id, title, artist) {
  try {
    const music = await Music.update(
      {
        title: title,
        artist,
      },
      { where: { id: id } }
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteMusic(id) {
  try {
    const music = await Music.deleteMusic({
      where: { id: id },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { addMusic, updateMusic, deleteMusic };
