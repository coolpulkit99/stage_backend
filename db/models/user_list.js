module.exports = (sequelize, DataTypes) => {
  const UserList = sequelize.define(
    'UserList',
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
      movie_id: {
        type: DataTypes.UUID,

      },
      tv_show_id: {
        type: DataTypes.UUID,

      },
      content_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'user_list',
    },
  );

  UserList.associate = (models) => {
    UserList.belongsTo(models.Movie, {
      foreignKey: 'movie_id',
      sourceKey: 'id',
    });
    UserList.belongsTo(models.TvShow, {
      foreignKey: 'tv_show_id',
      sourceKey: 'id',
    });
  };
  return UserList;
};
