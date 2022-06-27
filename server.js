const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/product.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
