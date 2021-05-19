import './Header.css';
import React from 'react';

import { Box, Flex, Spacer, IconButton, Icon } from '@chakra-ui/react';
import { CgMenuRight } from 'react-icons/cg';

import airbusLogo from '../../assets/logo/airbus-logo-dark.svg';
import chmodLogo from '../../assets/logo/chmod777-dark.svg';

const Header = () => {
    return (
        <Box boxShadow="md" p="2" bg="white">
            <Flex>
                <Flex alignItems="center">
                    <img className="app-logo" src={airbusLogo} alt="logo" />
                    <div
                        style={{
                            borderRight: '1px solid #101010a3',
                            height: '1.2rem',
                            margin: '0rem 0.5rem',
                        }}
                    ></div>
                    <img className="app-logo" src={chmodLogo} alt="logo" />
                </Flex>
                <Spacer />
                <Flex>
                    <IconButton
                        aria-label="Search database"
                        icon={<Icon as={CgMenuRight} />}
                    />
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
