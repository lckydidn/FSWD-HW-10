const express = require("express");
const Movies = require("../controllers/moviesController.js");
const auth = require("../middlewares/auth.js");
const moviesRoutes = express.Router();

moviesRoutes.get("/movies", auth, Movies.getAll);
moviesRoutes.post("/movies", auth, Movies.post);
moviesRoutes.put("/movies/:id", auth, Movies.put);
moviesRoutes.delete("/movies/:id", auth, Movies.delete);
module.exports = moviesRoutes;
