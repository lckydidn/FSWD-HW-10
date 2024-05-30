const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index.js");
const morgan = require("morgan");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
