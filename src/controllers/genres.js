import models from '../models';

const { Genre } = models;

async function create(ctx) {
  const data = ctx.request.body;

  const genre = await Genre.create(data);

  ctx.response.success({
    data: genre,
    status: 201,
    message: 'Genre created successfully',
  });
}

async function getById(ctx) {
  const { id } = ctx.request.params;

  const genre = await Genre.findOne({
    where: {
      id,
    },
  });

  if (!genre) {
    ctx.throw(404, 'Genre not found');
  }

  ctx.response.success({
    data: genre,
    message: 'Genre fetched successfully',
  });
}

async function getAll(ctx) {
  const genres = await Genre.findAll();

  ctx.response.success({
    data: genres,
    message: 'Genres fetched successfully',
  });
}

async function remove(ctx) {
  const { id } = ctx.request.params;

  await Genre.destroy({ where: { id } });

  ctx.response.success({
    data: null,
    status: 204,
    message: 'Genre deleted successfully',
  });
}

export { create, getById, getAll, remove };
