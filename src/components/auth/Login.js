import React, { useState } from 'react';
import axios from 'axios';
import { Link as ReactLink, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Box, Heading, Link, VStack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import './Login.css';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            setLoading(true);
            axios
                .post('/api/login', values)
                .then((res) => {
                    setLoading(false);
                    if (res.data.status === 'success') {
                        localStorage.setItem('sessionToken', res.data.token);
                        axios.defaults.headers.common['Authorization'] =
                            res.data.token;
                        localStorage.setItem('loggedIn', true);
                        const user = {
                            name: res.data.data.userFirstName,
                            email: res.data.data.email,
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                        props.onChange(user);
                        toast({
                            title: 'Success',
                            description: res.data.message,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });
                        history.push('/dashboard');
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    toast({
                        title: 'Error',
                        description: error.response.data.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    boxShadow="md"
                    p="6"
                    rounded="lg"
                    bg="white"
                    maxWidth="400px"
                >
                    <Heading size="md" mt="4" mb="8" textAlign="center">
                        Welcome back !
                    </Heading>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                placeholder="enter email"
                            />
                            <span className="errors">
                                {formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                            </span>
                        </Box>
                        <Box>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="enter password"
                            />
                            <span className="errors">
                                {formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}
                            </span>
                        </Box>

                        <span>
                            Don't have an account?{' '}
                            <Link as={ReactLink} color="teal.500" to="/signup">
                                Signup
                            </Link>
                        </span>

                        <Button size="md" type="submit" isLoading={loading}>
                            Login
                        </Button>
                    </VStack>
                </Box>
            </form>
        </div>
    );
};

export default Login;
