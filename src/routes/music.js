const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const https = require('https');
const cookieParser = require('cookie-parser');
const router = express.Router();

// 스포티파이 API 환경변수
const client_id = '64e2ab06dab340e28a661996e363124f';
const client_secret = '50ccef21e9ab46b48efe4ea526d50c04';
const redirect_uri = 'http://localhost:3000/music/callback';
const stateKey = 'spotify_auth_state';

var access_token = 'BQDv-5CatCdEM62WBnoSgLWT5F9JpdGticw58dJXayc8kDNkBi40tjKlGmZlf1PBrgQ5R81_aJQdm_f1K5nESAqfn5vTSuXfD7ANb_C0ekXlGyBwgZbEBk75_-xMcXQb6tOlN_pQYE7ZWIHfI4j7lgWQBvoIsLhI_IrcEHI2yuBdrwtBLlqImxkAX46nFXSrklMVF4_J4XF6tFdvPBsikQ';
var refresh_token = null;

// 랜덤 문자열 생성 함수
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get("/", function(req, res) {
    res.render('index', { title: 'Express' });
});

// 스포티파이 API 접속
router.get("/spotify", function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
});

// API callback 함수
router.get('/callback', function(req, res) {
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
            error: 'state_mismatch'
        }));
    }
    else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
    
                access_token = body.access_token,
                refresh_token = body.refresh_token;
                
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
    
                request.get(options, function(error, response, body) {
                    console.log(body);
                    console.log(access_token);
                });
    
                res.redirect('/music/#' +
                    querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
                console.log("End");
            }
            else {
                console.log("invalid");
                res.redirect('/music/#' +
                    querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
    }
});

router.get('/refresh_token', function(req, res){
    refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
    };
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            console.log(access_token);
            res.send({
                'access_token': access_token
            });
        }
    });
});

router.get("/search", function(req, res) {
  try {
    const word = req.query.word;
    const type = req.query.type;
    const qs = querystring.stringify({q: word, type: type, limit: 10});
    console.log(word + " " + type);
    console.log(qs);
    return new Promise((resolve, reject) => {
      if (!access_token || access_token === "") reject(new Error("No token"));      
      let data = "";
      
      const req = https.request({
        hostname: "api.spotify.com",
        path: `/v1/search?${qs}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        }
      }, (res) => {
        res.on("data", (d) => { data += d; });
        res.on("end", () => resolve(data));
      });
        
      req.on("error", (error) => reject(error));
      req.end();
    }).then((data) => {
      const songs = [];
      const list = JSON.parse(data)['tracks']['items'];
      console.log(list);
      list.forEach((e) => songs.push({name: e['name'], uri: e['uri']}));
      res.json({songs: songs});
      return;
    });
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;
