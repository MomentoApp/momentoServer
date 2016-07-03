const User = require('../models/userModel');

module.exports = {
  get: (req, res) => {
    console.log('user get req body', req.body);
    User.get(req.get('id'), (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },
  post: (req, res) => {
    console.log('user post req body', req.body);
    User.post(req.body, req.get('id'), req.get('token'), (err, data, status) => {
      if (err) throw err;
      res.status(201);
      res.send(JSON.stringify(`created ${status}`));
    });
  },
};
