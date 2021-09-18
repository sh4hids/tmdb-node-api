export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      adult: {
        type: Sequelize.BOOLEAN,
      },
      backdrop_path: {
        type: Sequelize.STRING,
      },
      genre_ids: {
        type: Sequelize.JSON,
      },
      tmdb_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      original_language: {
        type: Sequelize.STRING,
      },
      original_title: {
        type: Sequelize.STRING,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      popularity: {
        type: Sequelize.DECIMAL(10, 3),
      },
      poster_path: {
        type: Sequelize.STRING,
      },
      release_date: {
        type: Sequelize.DATEONLY,
      },
      title: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.BOOLEAN,
      },
      vote_average: {
        type: Sequelize.DECIMAL(10, 2),
      },
      vote_count: {
        type: Sequelize.INTEGER,
      },
      budget: {
        type: Sequelize.INTEGER,
      },
      belongs_to_collection: {
        type: Sequelize.JSON,
      },
      homepage: {
        type: Sequelize.STRING,
      },
      imdb_id: {
        type: Sequelize.STRING,
      },
      production_companies: {
        type: Sequelize.JSON,
      },
      production_countries: {
        type: Sequelize.JSON,
      },
      revenue: {
        type: Sequelize.INTEGER,
      },
      runtime: {
        type: Sequelize.INTEGER,
      },
      spoken_languages: {
        type: Sequelize.JSON,
      },
      status: {
        type: Sequelize.STRING,
      },
      tagline: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  },
};
