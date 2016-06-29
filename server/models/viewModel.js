const db = require('./../db');

module.exports = {
  view: (UserId, VideoId, cb) => {
    db.Video.findOne({
      where: {
        id: VideoId,
      },
    })
      .then(video =>
        db.View.findOrCreate({
          where: {
            UserId,
            VideoId,
          },
        })
          .spread((like, viewed) => {
            if (viewed) video.increment('view_count');
          })
      )
      .then(() => cb(null, 'viewed'))
      .catch(cb);
  },
};
