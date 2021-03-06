const Like = require('../models/likeModel');

module.exports = {
  post: (req, res) => {
    console.log('like post req params', req.params);
    if (req.params.liked === 'true') {
      Like.unlike(req.get('id'), req.params.video, (err, data) => {
        if (err) throw err;
        res.status(201);
        res.send(data);
      });
    } else {
      Like.like(req.get('id'), req.params.video, (err, data) => {
        if (err) throw err;
        res.status(201);
        res.send(data);
      });
    }
  },
};
