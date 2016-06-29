module.exports = {
  finalLike: (videoCopy, videoCopies, videos, iteration, cb) => {
    videoCopies.push(videoCopy);
    if (iteration === videos[0].length - 1) {
      const videoData = [videoCopies];
      for (let i = 1; i < videos.length; i++) {
        videoData.push(videos[i]);
      }
      cb(null, videoData);
    }
  },
};
