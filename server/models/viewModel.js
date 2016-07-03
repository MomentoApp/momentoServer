const db = require('./../db');

module.exports = {
  view: (facebook_id, VideoId, cb) => {
    db.User.findOne({
      where: { facebook_id },
    })
    .then(user => {
      db.Video.findOne({
        where: { id: VideoId },
      })
      .then(video =>
        db.View.findOrCreate({
          where: {
            VideoId,
            UserId: user.id,
          },
        })
        .spread((like, created) => {
          if (created) video.increment('view_count');
        })
      )
      .then(() => cb(null, 'viewed'))
      .catch(cb);
    })
    .catch(cb);
  },
}
