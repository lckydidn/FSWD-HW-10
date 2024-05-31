const model = require("../models");
// alternatively bisa make {Users} tinggal ubah Class module exports sama nnti manggil di routes
class UserRepository {
  static async findAll(offset, limit) {
    return await model.Users.findAll({ offset, limit });
  }

  static async findByEmail(email) {
    return await model.Users.findOne({ where: { email } });
  }

  static async findById(id) {
    return await model.Users.findByPk(id);
  }

  static async create(userData) {
    return await model.Users.create(userData);
  }

  static async update(id, userData) {
    await model.Users.update(userData, { where: { id: parseInt(id) } });
    return await UserRepository.findById(id);
  }

  static async delete(id) {
    return await model.Users.destroy({ where: { id: parseInt(id) } });
  }
}

module.exports = UserRepository;
