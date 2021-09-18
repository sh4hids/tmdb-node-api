import cron from 'node-cron';

import { getMovies } from '../../src/models/Tmdb';

const args = process.argv.slice(2);
const cronSchedule = args[0] || '0 0 * * *';

async function loadData() {
  const movies = await getMovies({
    'primary_release_date.gte': '2021-09-01',
    'primary_release_date.lte': '2021-09-30',
  });

  console.log(movies);
}

// daily: 0 0 * * *
cron.schedule(cronSchedule, () => {
  loadData();
});
