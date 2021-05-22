import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { ChakraProvider } from '@chakra-ui/react';
import { customTheme } from './theme';

import Header from './components/header/Header';
import UserAuth from './components/auth/UserAuth';
import Splash from './components/splash/Splash';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/not-found/NotFound';
import ManageFaq from './components/manage-faq/ManageFaq';
import BugSummary from './components/bug-summary/BugSummary';
import ManageAnnouncement from './components/manage-announcement/ManageAnnouncement';

import { ChmodChatComponent } from 'chmod777-assistant';
import 'chmod777-assistant/dist/index.css';

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const isLoggedIn = () => {
        let isValidToken = false;
        const token = localStorage.getItem('sessionToken');

        try {
            if (token) {
                const decodedToken = jwt_decode(token);
                const currentDate = new Date();

                // JWT exp is in seconds
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    isValidToken = false;
                } else {
                    isValidToken = true && localStorage.getItem('loggedIn');
                }
            }
        } catch {
            isValidToken = false;
        }

        if (!isValidToken) {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('user');
            alert(
                'Your session has expired. You will be redirected to the login page.'
            );
        }

        return isValidToken;
    };

    const handleUserUpdate = (values) => {
        setUser(values);
    };

    return (
        <div className="App">
            <ChakraProvider theme={customTheme}>
                <Router>
                    <Header user={user} onUserUpdate={handleUserUpdate} />
                    <Switch>
                        <Route exact path="/">
                            <Splash />
                        </Route>
                        <Route path="/login">
                            <UserAuth onUserUpdate={handleUserUpdate} />
                        </Route>
                        <Route path="/signup">
                            <UserAuth onUserUpdate={handleUserUpdate} />
                        </Route>
                        <Route
                            path="/dashboard"
                            render={() =>
                                isLoggedIn() ? (
                                    <Dashboard />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/manageFaq"
                            render={() =>
                                isLoggedIn() ? (
                                    <ManageFaq />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/bugSummary"
                            render={() =>
                                isLoggedIn() ? (
                                    <BugSummary />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/manageAnnouncement"
                            render={() =>
                                isLoggedIn() ? (
                                    <ManageAnnouncement />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                    <ChmodChatComponent
                        chatProps={{
                            appName: 'chmod777',
                            sessionToken: process.env.REACT_APP_SESSION_TOKEN,
                            botToken: process.env.REACT_APP_BOT_TOKEN,
                        }}
                    />
                </Router>
            </ChakraProvider>
        </div>
    );
}

export default App;
