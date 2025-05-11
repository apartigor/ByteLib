const dev = process.env.NODE_ENV === 'development';

export const API_URL = dev
  ? 'http://localhost:5000'
  : 'http://localhost:5000';