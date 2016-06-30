const db = require('./../db');
const getVideos = require('./helper').getVideos;
const getUserVideos = require('./helper').getUserVideos;

module.exports = {
  get: (latitude, longitude, radius, cb) => {
    db.sequelize.query(
      'select * from "Video" where ' +
      'ST_DWithin(ST_SetSRID' +
      '(ST_Point( ' + latitude +
      ', ' + longitude +
      '),4326)::geography, ST_SetSRID' +
      '(point,4326)::geography, '
      + radius + ' );'
    )
      .then(videos => {
        const videoCopies = [];
        videos[0].forEach((video, i) => {
          db.Like.findOne({
            where: {
              VideoId: video.id,
              // UserId,
            },
          })
            .then(liked => {
              const videoCopy = video;
              if (liked === null) {
                videoCopy.liked = false;
                getVideos(videoCopy, videoCopies, videos[0], i, cb);
              } else {
                videoCopy.liked = true;
                getVideos(videoCopy, videoCopies, videos[0], i, cb);
              }
            })
              .catch(cb);
        });
      })
      .catch(cb);
  },
  post: (newVideo, cb) => {
    db.Video.create({
      url: newVideo.url,
      point: newVideo.point,
      UserId: newVideo.UserId,
      username: newVideo.username,
      title: newVideo.title,
      location: 'somewhere',
    })
      .then(video => cb(null, video))
      .catch(cb);
  },
  getUserVideo: (user, cb) => {
    db.Video.findAll({
      where: {
        UserId: user,
      },
    })
      .then(videos => {
        const videoCopies = [];
        videos.forEach((video, i) => {
          db.Like.findOne({
            where: {
              VideoId: video.id,
              // UserId,
            },
          })
            .then(liked => {
              const videoCopy = video;
              if (liked === null) {
                videoCopy.dataValues.liked = false;
                getVideos(videoCopy, videoCopies, videos, i, cb);
              } else {
                videoCopy.dataValues.liked = true;
                getVideos(videoCopy, videoCopies, videos, i, cb);
              }
            })
              .catch(cb);
        });
      })
      .catch(cb);
  },
};
