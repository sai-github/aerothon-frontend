import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

const validate = (values) => {
    const errors = {};
    if (!values.userFirstName) {
        errors.userFirstName = 'Required';
    }

    if (!values.userSecondName) {
        errors.userSecondName = 'Required';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = 'Required';
    } else if (!/^[6-9]\d{9}$/i.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone address';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password !== values.retypePassword) {
        errors.password = "Password doesn't match";
        errors.retypePassword = "Password doesn't match";
    }

    return errors;
};

const Signup = () => {
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            userFirstName: '',
            userSecondName: '',
            phoneNumber: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        validate,
        onSubmit: (values) => {
            axios
                .post('/api/register', values)
                .then((res) => {
                    console.log(res);
                    history.push('/');
                })
                .catch((e) => console.error(e));
        },
    });

    return (
        <div>
            <div>Sign up</div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="userFirstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userFirstName}
                    />
                    {formik.errors.userFirstName ? (
                        <div>{formik.errors.userFirstName}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        id="lastname"
                        name="userSecondName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userSecondName}
                    />
                    {formik.errors.userSecondName ? (
                        <div>{formik.errors.userSecondName}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="phoneNumber">Phone No</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                    />
                    {formik.errors.phoneNumber ? (
                        <div>{formik.errors.phoneNumber}</div>
                    ) : null}
                </div>

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

                <div>
                    <label htmlFor="rePassword">Retype Password</label>
                    <input
                        id="rePassword"
                        name="retypePassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.retypePassword}
                    />
                    {formik.errors.retypePassword ? (
                        <div>{formik.errors.retypePassword}</div>
                    ) : null}
                </div>

                <Link to="/login">Go Login</Link>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
