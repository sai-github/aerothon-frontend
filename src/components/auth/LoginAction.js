import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { Button } from '@chakra-ui/button';

const LoginAction = (props) => {
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('storage', onLocalStorageChanges);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(
        () => () => {
            window.removeEventListener('storage', onLocalStorageChanges);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const onLocalStorageChanges = () => {
        if (localStorage.getItem('loggedIn')) {
            const user = JSON.parse(localStorage.getItem('user'));
            props.onUserChange(user);
        } else {
            props.onUserChange(null);
            history.push('/login');
        }
    };

    const logout = () => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        props.onUserChange(null);
        login();
    };

    const login = () => {
        history.push('/login');
    };

    return (
        <div style={{ marginRight: '1rem' }}>
            {props.user ? (
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
