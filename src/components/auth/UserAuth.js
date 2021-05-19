import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const UserAuth = () => {
    const location = useLocation();
    return <div>{location.pathname === '/login' ? <Login /> : <Signup />}</div>;
};

export default UserAuth;
