const View = require('../models/viewModel');

module.exports = {
  post: (req, res) => {
    console.log('view post req params', req.params);
    View.view(req.get('id'), req.params.video, (err, data) => {
      if (err) throw err;
      res.status(201);
      res.send(data);
    });
  },
};
