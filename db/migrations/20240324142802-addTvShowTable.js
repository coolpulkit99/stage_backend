/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tv_show', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },

      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },

    });

    await queryInterface.createTable('episode', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      tv_show_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tv_show',
          key: 'id',
        },
      },
      episode_number: {
        type: DataTypes.INTEGER,
      },

      season_number: {
        type: DataTypes.INTEGER,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('episode');
    await queryInterface.dropTable('tv_show');
  },
};
