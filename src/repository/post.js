const { Post } = require('../../models/index');

async function createPost(id, content, mail) {
  try {
    const post = await Post.create({
      content: content,
      id: id,
      created_time: Date.now(),
      topic_id: 1,
      edited: false,
      user_mail: mail,
    });
    return post
  } catch (error) {
    throw error;
  }
}

async function readPost(id) {
  try {
    const post = await Post.findAll({ where: { id: id } });
    return post;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, title, content) {
  try {
    const post = await Post.update(
      { title: title, content: content, edited: true },
      {
        where: {
          id: id,
        },
      }
    );
    return post;
  } catch (error) {
    throw error;
  }
}

async function deletePost(id) {
  try {
    const post = await Post.destroy({ where: { id: id } });
    return post
  } catch (error) {
    throw error;
  }
}

module.exports = { createPost, readPost, updatePost, deletePost };
