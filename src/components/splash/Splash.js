import React from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import './Splash.css';

import splash from '../../assets/banners/splash-colored.png';

const Dashboard = () => {
    const history = useHistory();

    const openSignup = () => {
        history.push('/signup');
    };

    return (
        <Flex
            justifyContent="center"
            paddingTop="80px"
            padding={{ base: '40px', md: '80px 0 0 0' }}
            alignItems="center"
            direction={{ base: 'column', md: 'row' }}
        >
            <Flex maxWidth="400px" direction="column" alignItems="center">
                <div className="eye-brow">👋 Hi, we’re chmod777!</div>
                <Box className="headline" textAlign={{ base: 'center' }}>
                    Interested in trying the{' '}
                    <span style={{ color: '#8045f1' }}>chmod777</span> Assistant
                    on your website?
                </Box>
                <Button rightIcon={<ArrowForwardIcon />} onClick={openSignup}>
                    Get Started
                </Button>
            </Flex>
            <img
                style={{ maxWidth: '400px', width: '100%' }}
                src={splash}
                alt="logo"
            />
        </Flex>
    );
};

export default Dashboard;
