module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      username: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'user',
      schema: 'public',
      underscored: true,
      timestamps: false,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.UserList, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'user_list',
    });
  };
  return User;
};
