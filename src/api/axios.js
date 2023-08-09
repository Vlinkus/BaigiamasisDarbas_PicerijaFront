import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Contend-Type':'application/json'},
    withCredentials:true
});
// we are attaching "interceptors" to this axiosPrivate
// they will work with JWT tokens for refresh
// and also will retry when we get a failure the first time.
// 403 status for failure.
// They will work on in the background and reset refresh tokens
// on a set schedule.