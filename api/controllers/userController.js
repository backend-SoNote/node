const db = require("../models");
const User = db.user;

exports.create = (req, res) => {
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

exports.read_a_user = (req, res) => {
  user.findById(req.params.userId, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update_a_user = (req, res) => {
  user.findOneAndUpdate(
    { _id: res.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete_a_user = (req, res) => {
  user.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.send(err);
    res.json({
      massage: "user successfully deleted",
      _id: req.params.userId,
    });
  });
};
