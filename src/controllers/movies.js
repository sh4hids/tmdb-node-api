import Sequelize from 'sequelize';

import { pageSize } from '../config';
import models from '../models';

const { Movie, Genre } = models;

async function create(ctx) {
  const data = ctx.request.body;

  const movie = await Movie.create(data);

  ctx.response.success({
    data: movie,
    status: 201,
    message: 'Movie created successfully',
  });
}

async function getById(ctx) {
  const { id } = ctx.request.params;

  let movie = await Movie.findOne({
    where: {
      id,
    },
  });

  if (!movie) {
    ctx.throw(404, 'Movie not found');
  }

  movie = JSON.parse(JSON.stringify(movie));

  const genres = await Genre.findAll();

  movie.genres = movie.genre_ids.map((genreId) =>
    genres.find((item) => item.tmdb_id === genreId)
  );

  delete movie.genre_ids;

  ctx.response.success({
    data: movie,
    message: 'Movie fetched successfully',
  });
}

async function getAll(ctx) {
  const {
    page = 1,
    limit = pageSize,
    startDate,
    endDate,
    sortBy = 'release_date.desc',
  } = ctx.query;

  const currentPage = Number(page);
  const offset = (currentPage - 1) * Number(limit);
  const filters = {
    ...(startDate && {
      release_date: {
        [Sequelize.Op.gte]: startDate,
      },
    }),
    ...(endDate && {
      release_date: {
        [Sequelize.Op.lte]: endDate,
      },
    }),
    ...(startDate &&
      endDate && {
        release_date: {
          [Sequelize.Op.gte]: startDate,
          [Sequelize.Op.lte]: endDate,
        },
      }),
  };

  const [key, direction] = sortBy.split('.');
  const order = [[key, direction.toUpperCase()]];

  const { count, rows } = await Movie.findAndCountAll({
    where: { ...filters },
    limit,
    offset,
    order,
  });

  const totalPages = Math.ceil(count / limit);

  ctx.response.success({
    data: {
      page: currentPage,
      totalPages,
      totalResults: count,
      results: rows,
    },
    message: 'Movies fetched successfully',
  });
}

async function remove(ctx) {
  const { id } = ctx.request.params;

  await Movie.destroy({ where: { id } });

  ctx.response.success({
    data: null,
    status: 204,
    message: 'Movie deleted successfully',
  });
}

export { create, getById, getAll, remove };
