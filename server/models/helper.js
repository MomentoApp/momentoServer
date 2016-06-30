module.exports = {
  getVideos: (videoCopy, videoCopies, videos, iteration, cb) => {
    videoCopies.push(videoCopy);
    if (iteration === videos.length - 1) {
      console.log('------------------', videoCopies)
      cb(null, videoCopies);
    }
  },
};
