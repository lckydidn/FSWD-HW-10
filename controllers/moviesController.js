const movieService = require("../services/moviesService");

class Movies {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const data = await movieService.getAllMovies(page);
      res.status(200).json({
        message: "Successfully Get All Movies",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to Get All Movies",
      });
    }
  }

  static async post(req, res) {
    try {
      const { title, genres, year } = req.body;
      const result = await movieService.createMovie(title, genres, year);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;
      const result = await movieService.updateMovie(id, title, genres, year);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await movieService.deleteMovie(id);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async upload(req, res) {
    try {
      const { id } = req.params;
      const file = req.file;
      const result = await movieService.uploadImage(id, file);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = Movies;
