module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    'Episode',
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
    },
    {
      timestamps: false,
      tableName: 'episode',
    }
  );

  return Episode;
};
