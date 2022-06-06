'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};
