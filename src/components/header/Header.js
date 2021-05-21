import './Header.css';
import React from 'react';

import {
    Box,
    Flex,
    Spacer,
    IconButton,
    Icon,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Avatar,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import { CgMenuRight, CgSupport, CgDebug } from 'react-icons/cg';

import airbusLogo from '../../assets/logo/airbus-logo-dark.svg';
import chmodLogo from '../../assets/logo/chmod777-dark.svg';
import LoginAction from '../auth/LoginAction';
import { EmailIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router';

const Header = (props) => {
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const sideNavItems = [
        {
            name: 'Manage FAQs',
            icon: CgSupport,
            routePath: '/manageFaq',
        },
        {
            name: 'Bugs Summary',
            icon: CgDebug,
            routePath: '/bugSummary',
        },
    ];

    const onNavigate = (value) => {
        onClose();
        history.push(value);
    };

    const onUserChange = (changes) => {
        props.onUserUpdate(changes);
    };

    return (
        <Box
            boxShadow="md"
            p={{ base: '4', md: '2' }}
            bg="white"
            position="relative"
        >
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
                    <LoginAction
                        user={props.user}
                        onUserChange={onUserChange}
                    />
                    <IconButton
                        ref={btnRef}
                        onClick={onOpen}
                        icon={<Icon as={CgMenuRight} />}
                    />
                </Flex>
            </Flex>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    {!props.user && (
                        <DrawerHeader>
                            <Stack direction="column" spacing={4} mt="16">
                                <Button
                                    variant="ghost"
                                    onClick={() => onNavigate('/')}
                                >
                                    Home
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => onNavigate('/login')}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </DrawerHeader>
                    )}

                    {props.user && (
                        <DrawerHeader>
                            <Flex pt="8" direction="column" alignItems="center">
                                <Avatar size="lg" name={props.user.name} />
                                <Text fontSize="2xl" mt="4">
                                    Atul Sharma
                                </Text>
                            </Flex>
                        </DrawerHeader>
                    )}

                    {props.user && (
                        <DrawerBody>
                            <Stack direction="column" spacing={4}>
                                {sideNavItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        leftIcon={<Icon as={item.icon} />}
                                        variant="ghost"
                                        onClick={() =>
                                            onNavigate(item.routePath)
                                        }
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </Stack>
                        </DrawerBody>
                    )}

                    {props.user && (
                        <DrawerFooter justifyContent="center">
                            <Stack direction="column" spacing={4}>
                                <Button
                                    leftIcon={<EmailIcon />}
                                    colorScheme="teal"
                                    variant="solid"
                                >
                                    Email
                                </Button>
                            </Stack>
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Header;
