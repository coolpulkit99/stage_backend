module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      username: {
        type: DataTypes.STRING,
      },

    });

    await queryInterface.createTable('preferences', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      favourite_genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      disliked_genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },

    });

    await queryInterface.createTable('watch_history', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      content_id: {
        type: DataTypes.STRING,

      },
      watched_on: {
        type: DataTypes.DATE,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('watch_history');
    await queryInterface.dropTable('preferences');
    await queryInterface.dropTable('user');
  },
};
