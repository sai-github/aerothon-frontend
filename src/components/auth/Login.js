import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';

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
            <div>Login</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                </div>

                <Link to="/signup">Go to Sign up</Link>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
