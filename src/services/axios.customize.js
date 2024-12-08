import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  if (typeof window !== "undefined" && window 
    && window.localStorage 
    && window.localStorage.getItem('access_token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
  }
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if (response.data && response.data.data) {

    return response.data;
  }
  return response;

}, function (error) {
  if (error.response && error.response.data) return error.response.data;
  return Promise.reject(error);
});

//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;