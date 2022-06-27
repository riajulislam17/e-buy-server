const e = require("cors");
const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.addProduct = async (req, res) => {
  const product = {
    category_id: req.body.categoryId,
    name: req.body.name,
    description: req.body.description,
  };
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while creating the Products.",
      });
    });
};

exports.viewProducts = async (req, res) => {
  await Product.findAll()
    .then((data) => {
      const response = data;
      res.send(response);
    })
    .catch((err) => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.product = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send({
        message: "Error retrieving",
      });
    });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  Product.update(req.body, {
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
          message: "updated unsuccessful.",
        });
      }
    })
    .catch((err) => {
      res.send({
        message: "Error updating",
      });
    });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.destroy({
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
        message: "Could not delete",
      });
    });
};
