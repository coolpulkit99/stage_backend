module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    'Movie',
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
    },
    {
      timestamps: false,
      tableName: 'movie',
    }
  );

  return Movie;
};
