const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }
  });
  const user = new User({
    uid: req.body.uid,
    provider: req.body.provider,
    email: req.body.email,
    role: req.body.role,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.json({
      massage: "user create success",
    });
  });
};



exports.signin = (req, res) => {
    User.findOne({
      uid: req.body.uid
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var token = jwt.sign({ id: user.id }, 'bezkoder-secret-key', {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          id: user._id,
          email: user.email,
          accessToken: token
        });
      });
  };
