const e = require("cors");
const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.addCategory = async (req, res) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };
  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while creating",
      });
    });
};

exports.viewCategory = async (req, res) => {
  await Category.findAll()
    .then((data) => {
      const response = data;
      res.send(response);
    })
    .catch((err) => {
      res.send({
        message: err.message || "Some error occurred while retrieving",
      });
    });
};

exports.category = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: "Error retrieving",
      });
    });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: true,
          message: "updated successfully.",
        });
      } else {
        res.send({
          status: false,
          message: "updated unsuccessful.",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Cannot delete",
      });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "deleted successfully!",
        });
      } else {
        res.send({
          message: "Cannot delete",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Could not delete",
      });
    });
};
