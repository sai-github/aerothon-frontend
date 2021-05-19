import { Button } from '@chakra-ui/button';
import React from 'react';
import { useHistory } from 'react-router';

const LoginAction = () => {
    const history = useHistory();
    const isLoggedIn = localStorage.getItem('loggedIn');

    const logout = () => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('loggedIn');
        login();
    };

    const login = () => {
        history.push('/login');
    };

    return (
        <div>
            {isLoggedIn ? (
                <Button variant="ghost" onClick={logout}>
                    Logout
                </Button>
            ) : (
                <Button variant="ghost" onClick={login}>
                    Login
                </Button>
            )}
        </div>
    );
};

export default LoginAction;
