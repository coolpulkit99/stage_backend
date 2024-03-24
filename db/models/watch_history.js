module.exports = (sequelize, DataTypes) => {
  const WatchHistory = sequelize.define(
    'WatchHistory',
    {
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
    },
    {
      timestamps: false,
      tableName: 'watch_history',
    }
  );

  return WatchHistory;
};
