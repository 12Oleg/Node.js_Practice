export const PATHS = {
  HOME: '/',
  API_DOCS: '/api-docs',
  HEALTH_CHECK: '/health-check',
  USERS: '/users',
  GENRES: '/genres',
  MOVIES: '/movies',
} as const;

export const ERRORS = {
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  REQUIRED_NAME: 'Name is required in the request body',
  GENRE_NOT_FOUND: 'Genre not found',
  VALIDATION_ERROR: 'Validation error occurred. Please check your input data and try again.',
  MISSING_FIELDS: 'Missing required field(s). Please provide all necessary information.',
  DUPLICATE_GENRE_ERROR: 'Duplicate Genre: The specified genre already exists.',
  MOVIE_NOT_FOUND: 'Movie not found',
} as const;
