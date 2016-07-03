module.exports = {
  getVideos: (videoCopy, videoCopies, videos, iteration, cb) => {
    videoCopies.push(videoCopy);
    if (iteration === videos.length - 1) {
      cb(null, JSON.stringify(videoCopies));
    }
  },
};
