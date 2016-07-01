// const secret = require('../secret').header_secret;
const secret = process.env.header_secret;

module.exports = {
  getHeader: (req, res, next) => {
    console.log('HEADER DETAILS', 
      [req.get('secret'), req.get('token'), req.get('id')]
    );
    if(req.get('secret') === secret) {
      next();
    } else {
      res.end('DENIED');
    }
  },
};
