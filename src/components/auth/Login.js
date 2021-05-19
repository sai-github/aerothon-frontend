import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

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

const Login = () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            console.log('sending login values', values);
            axios
                .post('/api/login', values)
                .then((res) => {
                    console.log(res);
                    if (res.data.status === 'success') {
                        localStorage.setItem('sessionToken', res.data.token);
                        axios.defaults.headers.common['Authorization'] =
                            res.data.token;
                        localStorage.setItem('loggedIn', true);
                        history.push('/');
                    }
                })
                .catch((e) => console.error(e));
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    <Heading size="md" my="4">
                        Login
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
                            {formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
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
                            {formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </Box>

                        <Link to="/signup">Go to Sign up</Link>

                        <Button size="md" type="submit">
                            Login
                        </Button>
                    </VStack>
                </Box>
            </form>
        </div>
    );
};

export default Login;
