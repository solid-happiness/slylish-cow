export const getApiUrl = () =>
  typeof window === 'undefined' ? 'http://localhost:5000' : '';
