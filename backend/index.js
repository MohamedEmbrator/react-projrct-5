const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./products").default;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});
app.get("/products", (req, res) => {
  res.send(products);
});
app.get("/products/:id", (req, res) => {
  res.send(products.find((el) => {
    return el.id == req.params.id;
  }));
});
const port = process.env.PORT || 5000;
app.listen(port, console.log(`http://localhost:${port}`));
