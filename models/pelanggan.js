"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pelanggan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      pelanggan.hasMany(models.kendaraan, {
        foreignKey: "id_pelanggan",
        onDelete: "CASCADE",
      });
    }
  }
  pelanggan.init(
    {
      nama: DataTypes.STRING,
      telepon: DataTypes.STRING,
      keanggotaan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pelanggan",
    }
  );
  return pelanggan;
};
