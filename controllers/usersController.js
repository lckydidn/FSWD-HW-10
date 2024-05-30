const model = require("../models");
const bcrypt = require("bcrypt");

class Users {
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const offset = (page - 1) * limit;

      const data = await model.Users.findAll({
        offset: offset,
        limit: limit,
      });
      res.status(200).json({
        message: "Sucessfully Get All Users",
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

      if (!email || !gender || !password || !role)
        return res.status(400).json({
          message: "Invalid input",
        });

      const existingUser = await model.Users.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser)
        return res.status(400).json({
          message: "Email already exists",
        });

      const hashPassword = await bcrypt.hash(password, 10);

      console.log("New data registered:", {
        email,
        gender,
        password: hashPassword,
        role,
      });

      const data = await model.Users.create({
        email: email,
        gender: gender,
        password: hashPassword,
        role: role,
      });

      res.status(200).json({
        message: "Register Complete",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Internal server error",
      });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await model.Users.findOne({
        where: {
          email,
        },
      });

      if (!data || !bcrypt.compareSync(password, data.password)) {
        return res.status(400).json({
          message: "Wrong Password",
        });
      }

      res.status(200).json({
        message: "Login Success",
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
      const hashPassword = bcrypt.hashSync(password, 10);

      if (!email || !gender || !password || !role)
        return res.status(400).json({
          message: "Invalid input",
        });

      const updateUsers = await model.Users.update(
        {
          email,
          gender,
          password: hashPassword,
          role,
        },
        {
          where: {
            id: parseInt(id),
          },
        }
      );

      res.status(200).json({
        message: "Data has been updated",
        updateUsers,
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
      const deleteUser = await model.Users.destroy({
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
}

module.exports = Users;
