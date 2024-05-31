const userRepository = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");

class UserService {
  static async getAllUsers(page) {
    const limit = 10;
    const offset = (page - 1) * limit;
    return await userRepository.findAll(offset, limit);
  }

  static async registerUser(email, gender, password, role) {
    if (!email || !gender || !password || !role) {
      return { status: 400, message: "Invalid input" };
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return { status: 400, message: "Email already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.create({
      email,
      gender,
      password: hashPassword,
      role,
    });
    return { status: 200, message: "Register Complete", data: newUser };
  }

  static async loginUser(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 400, message: "Wrong Password" };
    }
    return { status: 200, message: "Login Success" };
  }

  static async updateUser(id, email, gender, password, role) {
    if (!email || !gender || !password || !role) {
      return { status: 400, message: "Invalid input" };
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const updatedUser = await userRepository.update(id, {
      email,
      gender,
      password: hashPassword,
      role,
    });
    return { status: 200, message: "Data has been updated", data: updatedUser };
  }

  static async deleteUser(id) {
    await userRepository.delete(id);
    return { status: 200, message: "Delete success" };
  }
}

module.exports = UserService;
