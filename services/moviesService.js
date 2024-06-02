const movieRepository = require("../repositories/moviesRepository");
const upload = require("../middlewares/upload.js");

class MovieService {
  static async getAllMovies(page) {
    const limit = 10;
    const offset = (page - 1) * limit;
    return await movieRepository.findAll(offset, limit);
  }

  static async createMovie(title, genres, year) {
    if (!title || !genres || !year) {
      return { status: 400, message: "Invalid input" };
    }

    const existingMovie = await movieRepository.findByTitle(title);
    if (existingMovie) {
      return { status: 400, message: "Movie already exists" };
    }

    const newMovie = await movieRepository.create({ title, genres, year });
    return { status: 200, message: "Success input new Movie", data: newMovie };
  }

  static async updateMovie(id, title, genres, year) {
    if (!title || !genres || !year) {
      return { status: 400, message: "Invalid input" };
    }

    const updatedMovie = await movieRepository.update(id, {
      title,
      genres,
      year,
    });
    return {
      status: 200,
      message: "Data has been updated",
      data: updatedMovie,
    };
  }

  static async deleteMovie(id) {
    await movieRepository.delete(id);
    return { status: 200, message: "Delete success" };
  }

  static async uploadImage(id, file) {
    if (!file) {
      return { status: 400, message: "No Image provided" };
    }

    const movie = await movieRepository.findById(id);
    if (!movie) {
      return { status: 400, message: "Movie not found" };
    }

    const imageUrl = `http://localhost:3000/upload/${file.filename}`;
    await movieRepository.update(id, { image_url: imageUrl });
    const updated = await movieRepository.findById(id);
    return { status: 201, message: "Success", data: updated };
  }
}

module.exports = MovieService;
// bikin variabel baru contoh newMovies baru taro di line 60
