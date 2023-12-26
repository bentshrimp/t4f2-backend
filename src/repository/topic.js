const { Topic } = require('../../models/index');

async function createTopic(title, content) {
  try {
    const topic = await Topic.create({
      id : 1,
      title: title,
      content: content,
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function readTopic(title) {
  try {
    const topic = await Topic.findAll({
      where: { title: title },
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function deleteTopic(id) {
  try {
    const topic = await Topic.destroy({
      where: {
        id: id,
      },
    });
    return topic;
  } catch (error) {
    throw error;
  }
}

module.exports = { createTopic, readTopic, deleteTopic };
