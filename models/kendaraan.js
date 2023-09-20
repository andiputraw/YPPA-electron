"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      kendaraan.belongsTo(models.pelanggan, {
        foreignKey: "id_pelanggan",
        onDelete: "CASCADE",
      });
      kendaraan.hasMany(models.transaksi, {
        foreignKey: "id_kendaraan",
        onDelete: "CASCADE",
      });
    }
  }
  kendaraan.init(
    {
      platNomor: DataTypes.STRING,
      jenisKendaraan: DataTypes.STRING,
      id_pelanggan: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "kendaraan",
    }
  );
  return kendaraan;
};
