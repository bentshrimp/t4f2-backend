var express = require("express");
var router = express.Router();
const { sequelize, User, Topic, Post } = require("../models/index");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
