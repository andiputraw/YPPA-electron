"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transaksi.belongsTo(models.kendaraan, {
        foreignKey: "id_kendaraan",
        onDelete: "CASCADE",
      });
    }
  }
  transaksi.init(
    {
      status: DataTypes.STRING,
      tarif: DataTypes.NUMBER,
      mulai: DataTypes.DATE,
      beres: DataTypes.DATE,
      id_kendaraan: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "transaksi",
    }
  );
  return transaksi;
};
