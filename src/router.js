import Router from 'koa-router';

import * as genresController from './controllers/genres';
import * as moviesController from './controllers/movies';

const router = new Router();

router.post('/movies', moviesController.create);
router.get('/movies/:id', moviesController.getById);
router.get('/movies', moviesController.getAll);
router.delete('/movies/:id', moviesController.remove);

router.post('/genres', genresController.create);
router.get('/genres/:id', genresController.getById);
router.get('/genres', genresController.getAll);
router.delete('/genres/:id', genresController.remove);

router.get('/ping', (ctx) => {
  ctx.response.success({ data: 'pong', status: 200 });
});

export default router;
