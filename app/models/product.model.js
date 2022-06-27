module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      category_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      }
    });
  
    return Product;
  };
  