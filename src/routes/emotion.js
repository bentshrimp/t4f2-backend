const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const https = require('https');
const cookieParser = require('cookie-parser');
const {addEmotion, deleteEmotion} = require('../repository/emotion');
const router = express.Router();

router.post('/emotion', function(req, res) {
    const type = req.query.type;
    const nickname = req.query.nickname;
    const mail = req.query.mail;
    const postId = req.query.postId;

    addEmotion(type, id, nickname, mail, postId);
    //res.send({msg: "success post emote"});
});

router.delete('/emotion', function(req, res) {
    const id = req.query.id;
    deleteEmotion(id);
    //res.send({msg: "success delete emote"});
});

module.exports = router;