module.exports = (sequelize, DataTypes) => {
  const Preferences = sequelize.define(
    'Preferences',
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
      favourite_genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      disliked_genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
    },
    {
      timestamps: false,
      tableName: 'preferences',
    }
  );

  return Preferences;
};
