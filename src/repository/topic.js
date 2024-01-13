const { Topic } = require('../../models/index');
const { Op } = require('sequelize');

async function createTopic(title, content) {
  try {
    const topic = await Topic.create({
      title: title,
      content: content,
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function getTopic(id) {
  try {
    const topic = await Topic.findAll({
      where: { id: id },
    });
    return topic;
  } catch (error) {
    throw error;
  }
}
async function getSoredTopic(number, query) {
  try {
    const topic = await Topic.findAll({ limit: number, order: [query] });
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
    const topics = await Topic.findAll({ limit: 3 });
    return topics;
  } catch (error) {
    throw error;
  }
}

async function searchTopic(query) {
  try {
    const topics = await Topic.findAll({
      where: {
        content: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    return topics;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
  getTodayTopic,
  searchTopic,
};
