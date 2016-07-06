const User = require('../models/userModel');
const https = require('https');
// const secret = require('../secret').header_secret;
const secret = process.env.header_secret;

module.exports = {
  headerDetails: (req, outerRes, next) => {
    console.log('HEADER DETAILS', 
      [req.get('token'), req.get('id'), req.get('name'), req.get('pic')]
    );
    if ( req.get('secret') !== secret ) outerRes.end('Permission denied, please use the offical app')
    User.checkToken(req.get('token'), (err, data) => {
      if (err) throw err;
      if (data) {
        next();
      } else {
        https.get(`https://graph.facebook.com/${req.get('id')}/permissions?access_token=${req.get('token')}`, innerRes => {
          var body = '';
          innerRes.on('data', chunk => body += chunk);
          innerRes.on('end', () => {
            if(JSON.parse(body).data) {
              User.update(req.get('id'), req.get('token'), req.get('pictureUrl'), (err, data) => {
                if (err) throw err;
                if (data) next();
              })
            } else {
              outerRes.end('Permission denied, please sign in')
            }
          })
        })
      }
    })
  },
};
