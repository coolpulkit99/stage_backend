'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('movie', {
      id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
       primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      release_date: {
        type: DataTypes.DATE,
      },
      director: {
        type: DataTypes.STRING,
      },
      actors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movie');
  }
};
