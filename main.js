// Lucky Didan Ramadhan
// FSWD Batch 7
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index.js");
const morgan = require("morgan");
const path = require("path");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//static files
app.use("/upload", express.static(path.join(__dirname, "/uploads")));
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
