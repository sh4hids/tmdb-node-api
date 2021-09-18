import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Genre extends Model {
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
  Genre.init(
    {
      tmdb_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Genre',
    }
  );
  return Genre;
};
