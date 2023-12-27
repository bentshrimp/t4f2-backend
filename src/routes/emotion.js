const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const https = require('https');
const cookieParser = require('cookie-parser');
const {addEmotion, deleteEmotion} = require('../repository/emotion');
const {addMusic, updateMusic, deleteMusic} = require('../repository/music');
const router = express.Router();

router.post('/:emoteId', async (req, res) => {
    const type = req.query.type;
    const nickname = req.query.nickname;
    const mail = req.query.mail;
    const postId = req.query.postId;
    const id = req.params.emoteId;

    const emote = addEmotion(type, id, nickname, mail, postId);
    //res.send({msg: "success post emote"});
});

router.delete('/:emoteId', async (req, res) => {
    const id = req.params.emoteId;
    const emote = deleteEmotion(id);
    //res.send({msg: "success delete emote"});
});

router.post('/song/:postId', async (req, res) => {
    const title = req.query.title;
    const artist = req.query.artist;
    const user_mail = req.query.mail;
    const post_id = req.params.postId;

    const music = addMusic(title, artist, user_mail, post_id);
})

module.exports = router;