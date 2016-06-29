const db = require('./../db');
const finalLike = require('./helper').finalLike;

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
                finalLike(videoCopy, videoCopies, videos, i, cb);
              } else {
                videoCopy.liked = true;
                finalLike(videoCopy, videoCopies, videos, i, cb);
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
        cb(null, videos);
        // const videoCopies = [];
        // videos[0].forEach((video, i) => {
        //   db.Like.findOne({
        //     where: {
        //       VideoId: video.id,
        //       // UserId,
        //     },
        //   })
        //     .then(liked => {
        //       const videoCopy = video;
        //       if (liked === null) {
        //         videoCopy.liked = false;
        //         finalLike(videoCopy, videoCopies, videos, i, cb);
        //       } else {
        //         videoCopy.liked = true;
        //         finalLike(videoCopy, videoCopies, videos, i, cb);
        //       }
        //     })
        //       .catch(cb);
        // });
      })
      .catch(cb);
  },
};
