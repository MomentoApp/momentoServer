const db = require('./index');

db.sequelize.sync({ force: true })
  .then(() => {
    db.User.create({
      name: 'mango',
    });

    db.User.create({
      name: 'nick',
    });

    db.User.create({
      name: 'chris',
      facebook_id: 10206111678303889,
      facebook_token: 'EAAJ9fEjzCaQBAD8L35TMLfWWm3OebNsEYHNQ9ZBupm9el9Y5RZB3MqqS9ZCYQ8Rt5w9cqT5WZC3eZChUttbQc7k7hTsvMdeiN69KBacGEEupIMTZAwtM4Q6VYqYf5qk6vQjuewkasBfFpolEyxfOocwRgUmKUsmKoZD',
      email: 'cmhchoi@gmail.com',
    });

    // hack reactor
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7837221, -122.4091839] },
      UserId: 1,
      username: 'mango',
      title: '#hackerslife',
      location: 'Hack Reactor',
    });

    // westfield san francisco centre
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7847912, -122.40713522] },
      UserId: 1,
      username: 'mango',
      title: '#fooood',
      location: 'Westfield San Francisco Centre',
    });

    // powell station exit
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.784415, -122.408103] },
      UserId: 1,
      username: 'mango',
      title: '#party',
      location: 'Powell Station',
    });

    // old jerusalem
    db.Video.create({
      url: 'https://instagram.fsjc1-2.fna.fbcdn.net/t50.2886-16/13477956_200851573643145_931110641_n.mp4',
      point: { type: 'Point', coordinates: [37.7493593, -122.4183427] },
      UserId: 1,
      username: 'mango',
      title: '#bestfoodever',
      location: 'Old Jerusalem',
    });

    // soma restaurant and bar
    db.Video.create({
      url: 'https://s3-us-west-1.amazonaws.com/momentovids/uploads/VID_20160624_175458.mp4',
      point: { type: 'Point', coordinates: [37.7828398, -122.4064995] },
      UserId: 3,
      username: 'Chris Choi',
      title: '#teamdrinks',
      location: 'Soma Restaurant & Bar',
    });

    // cleary court
    db.Video.create({
      url: 'https://momentotest.s3.amazonaws.com/uploads%2F3317460.mov',
      point: { type: 'Point', coordinates: [37.7838873541724, -122.427163699302] },
      UserId: 2,
      username: 'nick',
      title: '#theview',
      location: 'Cleary Court',
    });

    // tropisueno
    db.Video.create({
      url: 'https://momentotest.s3.amazonaws.com/uploads%2F15929113.mov',
      point: { type: 'Point', coordinates: [37.7855675423962, -122.403703639069] },
      UserId: 2,
      username: 'nick',
      title: '#tacos',
      location: 'Tropisueno',
    });

    // palace of fine arts
    db.Video.create({
      url: 'https://s3-us-west-1.amazonaws.com/momentovids/uploads/VID_20160626_133845.mp4',
      point: { type: 'Point', coordinates: [37.803555, -122.447250] },
      UserId: 3,
      username: 'Chris Choi',
      title: '#gorgeousday',
      location: 'Palace of Fine Arts Theatre',
    });
  });

