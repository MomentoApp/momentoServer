const db = require('./../db');
const getVideos = require('./helper').getVideos;

module.exports = {
  get: (latitude, longitude, radius, facebook_id, cb) => {
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
          where: { VideoId: video.id },
          include: [{
            model: db.User,
            where: { facebook_id },
          }],
        })
        .then(liked => {
          const videoCopy = video;
          videoCopy.liked = liked === null ? false : true;       
          getVideos(videoCopy, videoCopies, videos[0], i, cb);
        })
        .catch(cb);
      });
    })
    .catch(cb);
  },
  post: (newVideo, facebook_id, cb) => {
    db.User.findOne({
      where: { facebook_id },
    })
    .then(user => {
      if ( user === null ) throw cb(null)
      db.Video.create({
        url: newVideo.url,
        point: newVideo.point,
        UserId: user.id,
        title: newVideo.title,
        location: 'somewhere',
        thumbnail: newVideo.thumbnailUrl,
      })
      .then(video => cb(null, video))
      .catch(cb);
    })
    .catch(cb);
  },
  getUserVideo: (facebook_id, cb) => {
    db.Video.findAll({
      include: [{
        model: db.User,
        where: { facebook_id },
      }],
    })
    .then(videos => {
      if (videos === null) throw cb(null, videos);
      const videoCopies = [];
      videos.forEach((video, i) => {
        db.Like.findOne({
          where: { VideoId: video.id },
          include: [{
            model: db.User,
            where: { facebook_id },
          }],
        })
        .then(liked => {
          const videoCopy = video;
          videoCopy.dataValues.liked = liked === null ? false : true;       
          getVideos(videoCopy, videoCopies, videos, i, cb);
        })
        .catch(cb);
      });
    })
    .catch(cb);
  },
  delete: (video, facebook_id, cb) => {
    db.Video.findOne({
      where: { id: video },
      include: [{
        model: db.User,
        where: { facebook_id },
      }],
    })
    .then(found => {
      if (found !== null) found.destroy();
      cb(null, found);
    })
    .catch(cb);
  },
};
