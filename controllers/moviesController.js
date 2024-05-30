const model = require("../models");
const upload = require("../middlewares/upload.js");
class Movies {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const offset = (page - 1) * limit;

      const data = await model.Movies.findAll({
        offset: offset,
        limit: limit,
      });
      res.status(200).json({
        message: "Sucessfully Get All Movies",
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

      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Invalid input",
        });

      const existingMovies = await model.Movies.findOne({
        where: {
          title: title,
        },
      });

      if (existingMovies)
        return res.status(400).json({
          message: "Movies already exists",
        });

      const postMovies = await model.Movies.create({
        title,
        genres,
        year,
      });

      res.status(200).json({
        message: "Success input new Movies",
        postMovies,
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

      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Invalid input",
        });

      const updateMovies = await model.Movies.update(
        {
          title,
          genres,
          year,
        },
        {
          where: {
            id: parseInt(id),
          },
        }
      );

      res.status(200).json({
        message: "Data has been updated",
        updateMovies,
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
      const id = req.params.id;
      const deleteUser = await model.Movies.destroy({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        message: "Delete success",
        deleteUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async upload(req, res, next) {
    try {
      const { id } = req.params;
      const file = req.file;
      const movies = await model.Movies.findByPk(id);
      if (!movies) {
        return res.status(400).json({
          message: "Movie not found",
        });
      }
      if (!file) {
        return res.status(400).json({
          message: "No Image provided",
        });
      }
      const image_url = `http://localhost:3000/upload/${file.filename}`;
      movies.update({
        image_url: image_url,
      });
      res.status(201).json({ message: "Success", movies });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
module.exports = Movies;
