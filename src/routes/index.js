const express = require("express");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/signin", (req, res) => {
  const filePath = path.join(__dirname, "../views/login.html");
  res.sendFile(filePath);
});

// 로그인 기능
router.post("/signin", async (req, res) => {
  try {
    const { email, nickname, pwd } = req.body;

    const exist = new loginSystem(email, pwd);
    const execute = await exist.Login();
  } catch (err) {
    console.log(err);
    if (err == "Nan") res.status(401).json({ msg: "Non Account" });
    else res.status(401).json({ msg: "Format Error" });
  }
});

// 회원가입 기능
router.post("/signup", async (req, res) => {
  try {
    const { email, nickname, pwd } = req.body;
    const module = new LoginSystem(email, pwd);
    const execute = await module.Register(nickname);
    console.log(email + " " + nickname);

    if (execute == 1) {
      console.log(nickname + "님이 회원가입 하셨습니다.");
      res.status(200).send("Success Register");
    } else if (execute == 2) {
      console.log("해당 이메일은 등록된 주소입니다.");
      res.status(400).send("Duplicate E-mail : " + email);
    } else {
      console.log("잘못된 입력입니다.");
      res.status(401).send("알 수 없는 오류");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("알 수 없는 오류");
  }
});

// 로그아웃 엔드포인트
router.post("/signout", function (req, res) {
  if (req.session.userId) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("login");
        res.status(200).send("logout");
      }
    });
  } else {
    res.status(400).send("logout failed");
  }
});

// 사용자가 글을 게시하는 endpoint
router.post("/upload", function (req, res) {});

module.exports = router;
