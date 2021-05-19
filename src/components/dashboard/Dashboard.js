import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const Dashboard = () => {
    const history = useHistory();
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    const getUsers = () => {
        axios
            .get('api/user/listuser')
            .then((res) => {
                console.log(res);
            })
            .catch((e) => console.error(e));
    };

    const logout = () => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('loggedIn');
        history.push('/login');
    };

    return (
        <VStack>
            <div>Dashboard</div>
            <Button onClick={getUsers}>Get users</Button>
            {isLoggedIn && <Button onClick={logout}>Logout</Button>}
        </VStack>
    );
};

export default Dashboard;
