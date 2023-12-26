var express = require('express');
const {
  createPost,
  deletePost,
  readPost,
  updatePost,
} = require('../repository/post');
var router = express.Router();

router.post('/', async function (req, res) {
  const { content, mail, topic_id } = req.body;
  await createPost(content, mail, topic_id);
  res.status(200).send('ok');
});

router.get('/:postId', async function (req, res, next) {
  const post = (await readPost(req.params.postId))[0];
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(400).json({ msg: 'no post found' });
  }
});

router.put('/:postId', async (req, res, next) => {
  if (await readPost(req.params.postId)) {
    const { title, content } = req.body;
    const post = await updatePost(req.params.postId, title, content);
    res.status(200).send('ok');
  } else {
    res.status(400).json({ msg: 'no post found' });
    res.redirect('/');
  }
});

router.delete('/:postId', async (req, res) => {
  const post = await deletePost(req.params.postId);
  res.status(200).send('ok');
});

module.exports = router;
