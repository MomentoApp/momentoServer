const Video = require('../models/videoModel');

module.exports = {
  get: (req, res) => {
    console.log('video get req body', req.params);
    Video.get(req.params.latitude, req.params.longitude, req.params.radius, req.get('id'), (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },
  post: (req, res) => {
    console.log('video post req body', req.body);
    Video.post(req.body, req.get('id'), (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  },
  getUserVideo: (req, res) => {
    console.log('getUserVideo req body', req.params);
    Video.getUserVideo(req.get('id'), (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  },
  deleteVideo: (req, res) => {
    console.log('delete video req body', req.params);
    Video.delete(req.params.video, req.get('id'), (err, data) => {
      if (err) throw err;
      res.send(data);
    })
  },
};
