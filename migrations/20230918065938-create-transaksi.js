"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksis", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      tarif: {
        type: Sequelize.NUMBER,
      },
      mulai: {
        type: Sequelize.DATE,
      },
      beres: {
        type: Sequelize.DATE,
      },
      id_kendaraan: {
        type: Sequelize.NUMBER,
        references: {
          model: {
            tableName: "kendaraans",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaksis");
  },
};
