import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { baseUrl } from './config';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] =
    localStorage.getItem('sessionToken');

axios.interceptors.request.use((request) => {
    return request;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (401 === error.response.status) {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            alert(
                'Your session has expired. You will be redirected to the login page.'
            );
            window.location = '/login';
        } else {
            return Promise.reject(error);
        }
    }
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
