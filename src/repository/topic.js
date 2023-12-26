const { Topic } = require('../../models/index');

async function createTopic(title, content) {
  try {
    const topic = await Topic.create({
      id: 1,
      title: title,
      content: content,
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function readTopic(id) {
  try {
    const topic = await Topic.findAll({
      where: { id: id },
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function updateTopic(id, title, content) {
  try {
    const topic = await Topic.update(
      { title: title, content: content },
      {
        where: {
          id: id,
        },
      }
    );
    return topic;
  } catch (error) {
    throw error;
  }
}
async function deleteTopic(id) {
  try {
    const post = await Topic.destroy({ where: { id: id } });
    return post;
  } catch (error) {
    throw error;
  }
}

async function getTodayTopic() {
  try {
    const posts = await Topic.findAll({ limit: 3 });
    return posts;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTopic,
  readTopic,
  updateTopic,
  deleteTopic,
  getTodayTopic,
};
