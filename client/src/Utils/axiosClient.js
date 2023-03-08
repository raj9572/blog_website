import axios from 'axios'
import { ACCESS_KEY, getItem, removeItem, setItem } from './localStorageManager';


export const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});


axiosClient.interceptors.request.use(request => {
  // perform a task before the request is sent
  const accessToken = getItem(ACCESS_KEY);
  request.headers['Authorization'] = `Bearer ${accessToken}`;

  return request;
}, error => {
  // handle the error
  return Promise.reject(error);
});


axiosClient.interceptors.response.use(async (response) => {
  // do something with the response data
  const data = response.data
  if (data.status === 'ok') {
    return response
  }

  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.message;

  if (statusCode === 401 && originalRequest.url === 'http://localhost:5000/user/refresh') {
    removeItem(ACCESS_KEY);
    window.location.replace('/login', "_self")
    
    return Promise.reject(error)
  }

  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = await axios.create({
      withCredentials: true,
    }).get(`http://localhost:5000/user/refresh`)

      // console.log('refrsh token',response)
    if (response.data.status === 'ok') {
      setItem(ACCESS_KEY, response.data.message)
      originalRequest.headers['Authorization'] = `Bearer ${response.data.message}`
      return axios(originalRequest)
    }else {
      removeItem(ACCESS_KEY);
      window.location.replace('/login', "_self")
      return Promise.reject(error)
    }

  }



  return Promise.reject(error)
}, error => {
  // handle the response error
  return Promise.reject(error);
});


