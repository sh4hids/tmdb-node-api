/* eslint-disable camelcase */
import { subDays, format } from 'date-fns';
import minimist from 'minimist';
import cron from 'node-cron';

import models from '../../src/models';
import {
  getMovies,
  getGenres,
  getMovieDetails,
  getMovieCredits,
} from '../../src/models/Tmdb';

const { Movie, Genre } = models;

const args = minimist(process.argv.slice(2));
const { cronSchedule } = args; // daily at midnight

const now = new Date();
const endDate = args.startDate || format(now, 'yyyy-MM-dd');
const startDate = args.endDate || format(subDays(now, 30), 'yyyy-MM-dd');

console.log({
  startDate,
  endDate,
  cronSchedule,
});

function addMovieDataToDB(movies = []) {
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

  const promises = [];
  const movies = [];

  const data = await getMovies(filters);

  data.results.forEach((movie) => {
    promises.push(getMovieDetails(movie.id));
    promises.push(getMovieCredits(movie.id));
  });

  const values = await Promise.allSettled(promises);

  // eslint-disable-next-line prefer-destructuring
  for (let i = 0, length = values.length; i < length; i += 2) {
    const details = values[i];
    const credits = values[i + 1];

    if (details.status === 'fulfilled') {
      const tmdb_id = details.value.id;
      const movieSummary =
        data.results.find((item) => item.id === tmdb_id) || {};
      const movie = { tmdb_id, ...details.value, ...movieSummary };

      if (credits.status === 'fulfilled') {
        movie.credits = credits.value;
      }

      delete movie.id;

      movies.push(movie);
    }
  }

  addMovieDataToDB(movies);

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

// for daily use: 0 0 * * *
if (cronSchedule) {
  cron.schedule(cronSchedule, () => {
    loadMovieData();
    loadGenreData();
  });
} else {
  loadGenreData();
  loadMovieData();
}
