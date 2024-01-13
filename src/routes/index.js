const express = require('express');
const path = require('path');
const router = express.Router();
const { createUser, findUser } = require('../repository/user');
const { getTodayTopic } = require('../repository/topic');
const dbConfig = require('../../config/config.json');
const jwt = require('jsonwebtoken');
const { createHashedPassword } = require('../lib/auth');

const SECRET_KEY = process.env.SECRET_KEY;

/* GET home page. */
router.get('/', async (req, res) => {
  const todayposts = await getTodayTopic();
  console.log(todayposts);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.status(200).json(todayposts);
});

router.get('/signin', (req, res) => {
  const filePath = path.join(__dirname, '../views/login.html');
  res.sendFile(filePath);
});

// 로그인 기능
router.post('/signin', async (req, res) => {
  try {
    const email = req.body.email;
    const inputPwd = req.body.password;

    const exist = await findUser(email);
    const password = exist.dataValues.password;
    const salt = exist.dataValues.salt;
    // console.log('exsit:', exist.dataValues);
    if (!exist) {
      res.status(401).send({ msg: "account doesn't exist" });
    }
    const { hashedPwd } = await createHashedPassword(inputPwd, salt);
    // console.log(hashedPwd);
    if (password !== hashedPwd) {
      res.status(401).send({ msg: 'wrong password' });
    } else {
      // res.cookie('email', JSON.stringify(email));
      const token = jwt
        .sign(
          {
            email: email,
            password: password,
          },
          SECRET_KEY,
          {
            expiresIn: '5m', // for test,
          }
        )
        // res.status(200).json({ msg: 'Login success' });
        .res.redirect('/');
    }
  } catch (err) {
    console.log(err);
    if (err == 'Nan') res.status(401).json({ msg: 'Non Account' });
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
      const { hashedPwd, salt } = await createHashedPassword(password);
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
router.post('/signout', function (req, res) {
  if (req.session.userId) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('email');
        res.status(200).send('logout');
      }
    });
  } else {
    res.status(400).send('logout failed');
  }
});

module.exports = router;
