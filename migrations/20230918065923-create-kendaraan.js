"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("kendaraans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      platNomor: {
        type: Sequelize.STRING,
      },
      jenisKendaraan: {
        type: Sequelize.STRING,
      },
      id_pelanggan: {
        type: Sequelize.NUMBER,
        references: {
          model: {
            tableName: "pelanggans",
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
    await queryInterface.dropTable("kendaraans");
  },
};
