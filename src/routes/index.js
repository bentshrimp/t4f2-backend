const express = require('express');
const path = require('path');
const router = express.Router();
const { createUser, findUser } = require('../repository/user');
const { getTodayTopic } = require('../repository/topic');
const dbConfig = require('../../config/config.json');
const jwt = require('jsonwebtoken');
const { hashPwd } = require('../lib/auth');
const morgan = require('morgan');
const { signToken, authToken } = require('../lib/jwt');
const { RefreshToken } = require('../../models');
require('dotenv').config();

/* GET home page. */
router.get('/', async (req, res) => {
  const todayposts = await getTodayTopic();
  console.log(todayposts);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.status(200).json(todayposts);
});

router.post('/token', authToken, (req, res) => {
  res.status(200).json({ msg: 'clear' });
});

// 로그인 기능
router.post('/signin', async (req, res) => {
  try {
    // from client
    const email = req.body.email;
    const clientPwd = req.body.password;
    // from DB
    const exist = await findUser(email);
    const nickname = exist.dataValues.nickname;
    const dbPwd = exist.dataValues.password;
    const salt = exist.dataValues.salt;
    // console.log('exsit:', exist.dataValues);

    if (!exist) {
      res.status(401).send({ msg: "account doesn't exist" });
    }

    const { hashedPwd } = await hashPwd(clientPwd, salt);
    // console.log(hashedPwd);
    if (dbPwd !== hashedPwd) {
      res.status(401).send({ msg: 'wrong password' });
    } else {
      const accessToken = await signToken(
        { email: email, password: hashedPwd },
        '5m'
      );
      const refreshToken = await signToken({}, '10m');
      await RefreshToken.create({
        refreshToken: refreshToken,
        user_nickname: nickname,
      });
      res
        .status(200)
        .setHeader('Authorization', 'Bearer ' + accessToken)
        .setHeader('Refresh', 'Bearer ' + refreshToken)
        .json({ msg: 'Login success' });
    }
  } catch (err) {
    console.log(err);
    if (err == 'Nan') res.status(401).json({ msg: 'Account not found' });
    else res.status(401).json({ msg: 'Format Error' });
  }
});

// 회원가입 기능
router.post('/signup', async (req, res) => {
  try {
    const { email, nickname, password } = req.body;
    const exist = await findUser(email);
    if (exist) {
      res.status(400).json({ msg: 'You have already signed up' });
    } else {
      const { hashedPwd, salt } = await hashPwd(password);
      // console.log(hashedPwd, salt);
      await createUser(email, nickname, hashedPwd, salt);
      res.status(200).json({ msg: 'signup success' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send('알 수 없는 오류');
  }
});

// 로그아웃 엔드포인트
router.post('/signout', function (req, res) {});

module.exports = router;
