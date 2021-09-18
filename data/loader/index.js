import { subDays, format } from 'date-fns';
import minimist from 'minimist';
import cron from 'node-cron';

import models from '../../src/models';
import { getMovies, getGenres } from '../../src/models/Tmdb';

const { Movie, Genre } = models;

const args = minimist(process.argv.slice(2));
const cronSchedule = args.cronSchedule || '0 0 * * *'; // daily at midnight

const now = new Date();
const endDate = args.startDate || format(now, 'yyyy-MM-dd');
const startDate = args.endDate || format(subDays(now, 30), 'yyyy-MM-dd');

console.log({
  startDate,
  endDate,
  cronSchedule,
});

function addMovieDataToDB(data = {}) {
  const movies = data.results.map(({ id, ...otherProps }) => ({
    tmdb_id: id,
    ...otherProps,
  }));

  console.log(`Adding movie data for page: ${data.page} (${movies.length})`);
  Movie.bulkCreate(movies, {
    updateOnDuplicate: ['tmdb_id'],
  });
}

async function loadMovieData(page = 1) {
  const filters = {
    page,
    'primary_release_date.gte': startDate,
    'primary_release_date.lte': endDate,
  };

  const data = await getMovies(filters);

  addMovieDataToDB(data);

  if (data.total_pages > data.page) {
    return loadMovieData(data.page + 1);
  }

  return 'Done';
}

async function loadGenreData() {
  console.log('Adding genre data...');
  const data = await getGenres();

  const genres = data.genres.map((genre) => ({
    tmdb_id: genre.id,
    name: genre.name,
  }));

  // making it asynchronous by fire and forget, as we don't need the result
  Genre.bulkCreate(genres, {
    updateOnDuplicate: ['tmdb_id'],
  });
}

// daily: 0 0 * * *
cron.schedule(cronSchedule, () => {
  loadMovieData();
  loadGenreData();
});
