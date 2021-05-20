import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const UserAuth = () => {
    const location = useLocation();
    return (
        <Flex
            p={{ base: '40px', md: '80px 100px' }}
            flex="1 1 auto"
            bgGradient="linear-gradient(-45deg, #FFC796 0%, #FF6B95 100%)"
            justifyContent="center"
        >
            {location.pathname === '/login' ? <Login /> : <Signup />}
        </Flex>
    );
};

export default UserAuth;
