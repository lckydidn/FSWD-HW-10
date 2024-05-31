const model = require("../models");

class MovieRepository {
  static async findAll(offset, limit) {
    return await model.Movies.findAll({ offset, limit });
  }

  static async findByTitle(title) {
    return await model.Movies.findOne({ where: { title } });
  }

  static async findById(id) {
    return await model.Movies.findByPk(id);
  }

  static async create(movieData) {
    return await model.Movies.create(movieData);
  }

  static async update(id, movieData) {
    await model.Movies.update(movieData, { where: { id: parseInt(id) } });
    return await MovieRepository.findById(id);
  }

  static async delete(id) {
    return await model.Movies.destroy({ where: { id: parseInt(id) } });
  }
}

module.exports = MovieRepository;
