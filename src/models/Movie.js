import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable no-unused-vars */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      adult: DataTypes.BOOLEAN,
      backdrop_path: DataTypes.STRING,
      genre_ids: DataTypes.JSON,
      tmdb_id: { type: DataTypes.INTEGER, unique: true },
      original_language: DataTypes.STRING,
      original_title: DataTypes.STRING,
      overview: DataTypes.TEXT,
      popularity: DataTypes.DECIMAL(10, 3),
      poster_path: DataTypes.STRING,
      release_date: DataTypes.DATEONLY,
      title: DataTypes.STRING,
      video: DataTypes.BOOLEAN,
      vote_average: DataTypes.DECIMAL,
      vote_count: DataTypes.INTEGER,
      budget: DataTypes.INTEGER,
      belongs_to_collection: DataTypes.JSON,
      homepage: DataTypes.STRING,
      imdb_id: DataTypes.STRING,
      production_companies: DataTypes.JSON,
      production_countries: DataTypes.JSON,
      revenue: DataTypes.INTEGER,
      runtime: DataTypes.INTEGER,
      spoken_languages: DataTypes.JSON,
      status: DataTypes.STRING,
      tagline: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Movie',
    }
  );
  return Movie;
};
