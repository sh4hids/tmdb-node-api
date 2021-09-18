import models from '../models';

const { Movie } = models;

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

  const movie = await Movie.findOne({
    where: {
      id,
    },
  });

  if (!movie) {
    ctx.throw(404, 'Movie not found');
  }

  ctx.response.success({
    data: movie,
    message: 'Movie fetched successfully',
  });
}

async function getAll(ctx) {
  const movies = await Movie.findAll();

  ctx.response.success({
    data: movies,
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
