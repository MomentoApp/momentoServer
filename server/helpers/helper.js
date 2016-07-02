const User = require('../models/userModel');
const https = require('https');

module.exports = {
  headerDetails: (req, outerRes, next) => {
    console.log('HEADER DETAILS', 
      [req.get('token'), req.get('id'), req.get('name'), req.get('pic')]
    );
    User.checkToken(req.get('token'), (err, data) => {
      if (err) throw err;
      if (data) {
        next();
      } else {
        https.get(`https://graph.facebook.com/${req.get('id')}/permissions?access_token=${req.get('token')}`, innerRes => {
          let body = '';
          innerRes.on('data', chunk => body += chunk);
          innerRes.on('end', () => {
            if(JSON.parse(body).data) {
              User.update(req.get('id'), req.get('token'), (err, data) => {
                if (err) throw err;
                if (data) next();
              })
            } else {
              outerRes.end('Permission denied')
            }
          })
        })
      }
    })
  },
};
