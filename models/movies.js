"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movies.init(
    {
      title: DataTypes.STRING,
      genres: DataTypes.STRING,
      year: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movies",
      tableName: "movies",
      timestamps: false,
    }
  );
  return Movies;
};
