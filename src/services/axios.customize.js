import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    if(response.data && response.data.data){
        return response.data;
    }
    return response
    
  }, function (error) {
    if(error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
  });

//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;