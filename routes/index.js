var express = require('express');
var router = express.Router();
const { readPost, createPost } = require('../src/repository/post');
const { createUser, findUser } = require('../src/repository/login');
const { createTopic } = require('../src/repository/topic');

router.get('/post', async function (req, res, next) {
  try {
    // const post = await createPost(1, 'content', 'mail');
    const post = await readPost(1);
    if (post === null) {
      console.log('post not found');
    } else {
      console.log('post: ', post);
    }
  } catch (error) {
    console.log(error);
  }
});


router.get('/user', async function (req, res, next) {
  try {
    const user = await createUser('mail', 'nickname', 'pwd');
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

router.get('/topic', async function (req, res, next) {
  try {
    const topic = await createTopic('topic_title', 'topic_content');
    console.log(topic);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
