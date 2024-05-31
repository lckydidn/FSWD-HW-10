const userService = require("../services/usersService");

class Users {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const data = await userService.getAllUsers(page);
      res.status(200).json({
        message: "Successfully Get All Users",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to Get All Users",
      });
    }
  }

  static async register(req, res) {
    try {
      const { email, gender, password, role } = req.body;
      const result = await userService.registerUser(
        email,
        gender,
        password,
        role
      );
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

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const { email, gender, password, role } = req.body;
      const result = await userService.updateUser(
        id,
        email,
        gender,
        password,
        role
      );
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
      const result = await userService.deleteUser(id);
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

module.exports = Users;
