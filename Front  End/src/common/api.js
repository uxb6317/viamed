import axios from 'axios';

/* instance of Axios with default settings */
export const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

/* If available send the JWT token and language along with language */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.token; // user auth token if available
    const lang = localStorage.i18nextLng; // user language (Croation or English)

    config.params = { lang };
    if (token) config.headers.Authorization = token.replace(/['"]+/g, '');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
