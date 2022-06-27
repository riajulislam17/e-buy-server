const e = require("cors");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  const user = {
    uname: req.body.name,
    phone: "",
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 11),
    role: "user",
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body?.email },
  });

  if (!user) {
    return { error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      `${process.env.ACCESS_TOKEN}`
    );

    return res.json({ token, user });
  } else {
    return res.json({ user: false });
  }
};

exports.retrieve = async (req, res) => {
  await User.findAll()
    .then((data) => {
      const response = data;
      res.send(response);
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.retrieveOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: "Error retrieving User",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: true,
          message: "updated successful.",
        });
      } else {
        res.send({
          message: "updated unsuccessful.",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Error updating User",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleted successfully!",
        });
      } else {
        res.send({
          message: "deleted unsuccessful!",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Could not delete User",
      });
    });
};
