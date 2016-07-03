const db = require('./../db');

module.exports = {
  like: (facebook_id, VideoId, cb) => {
    db.User.findOne({
      where: { facebook_id },
    })
    .then(user => {
      db.Video.findOne({
        where: { id: VideoId },
      })
      .then(video =>
        db.Like.findOrCreate({
          where: { 
            VideoId,
            UserId: user.id,
          },
        })
        .spread((like, created) => {
          if (created) video.increment('like_count');
        })
      )
      .then(() => cb(null, 'like'))
      .catch(cb);
    })
    .catch(cb);
  },
  unlike: (facebook_id, VideoId, cb) => {
    db.Video.findOne({
      where: { id: VideoId },
    })
    .then(video =>
      video.decrement('like_count')
    )
    .then(() => {
      db.Like.findOne({
        where: { VideoId },
        include: [{
          model: db.User,
          where: { facebook_id },
        }],
      })
      .then(like => like.destroy());
    })
    .then(() => cb(null, 'unliked'))
    .catch(cb);
  },
};
