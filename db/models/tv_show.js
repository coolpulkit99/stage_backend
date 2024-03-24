module.exports = (sequelize, DataTypes) => {
  const TvShow = sequelize.define(
    'TvShow',
    {
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
    },
    {
      timestamps: false,
      tableName: 'tv_show',
    }
  );

  return TvShow;
};
