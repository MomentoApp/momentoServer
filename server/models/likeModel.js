const db = require('./../db');

module.exports = {
  like: (UserId, VideoId, cb) => {
    db.Video.findOne({
      where: {
        id: VideoId,
      },
    })
      .then(video =>
        db.Like.findOrCreate({
          where: {
            UserId,
            VideoId,
          },
        })
          .spread((like, liked) => {
            if (liked) video.increment('like_count');
          })
      )
      .then(() => cb(null, 'like'))
      .catch(cb);
  },
  unlike: (UserId, VideoId, cb) => {
    db.Video.findOne({
      where: {
        id: VideoId,
      },
    })
      .then(video =>
        video.decrement('like_count')
      )
      .then(() => {
        db.Like.findOne({
          where: {
            UserId,
            VideoId,
          },
        })
          .then(like =>
            like.destroy()
          );
      })
      .then(() => cb(null, 'unliked'))
      .catch(cb);
  },
};
