import axios from 'axios';
import qs from 'query-string';

import { tmdbApiKey, tmdbApiUrl } from '../config';
import logger from '../logger';

async function getMovies(params = {}) {
  try {
    const queries = {
      api_key: tmdbApiKey,
      ...params,
    };

    const response = await axios.get(
      `${tmdbApiUrl}/discover/movie?${qs.stringify(queries)}`
    );
    return response.data;
  } catch (error) {
    logger.error(error);
    return {};
  }
}

async function getMovieDetails(id) {
  try {
    const queries = {
      api_key: tmdbApiKey,
    };

    const response = await axios.get(
      `${tmdbApiUrl}/movie/${id}?${qs.stringify(queries)}`
    );
    return response.data;
  } catch (error) {
    logger.error(error);
    return {};
  }
}

async function getGenres() {
  try {
    const queries = {
      api_key: tmdbApiKey,
    };

    const response = await axios.get(
      `${tmdbApiUrl}/genre/movie/list/?${qs.stringify(queries)}`
    );
    return response.data;
  } catch (error) {
    logger.error(error);
    return {};
  }
}

export { getMovies, getMovieDetails, getGenres };
