import React from 'react';
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
import PrivateDashboard from './components/dashboard/PrivateDashboard';
import NotFound from './components/not-found/NotFound';

function App() {
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
            alert(
                'Your session has expired. You will be redirected to the login page.'
            );
        }

        return isValidToken;
    };

    return (
        <div className="App">
            <ChakraProvider theme={customTheme}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Splash />
                        </Route>
                        <Route path="/login">
                            <UserAuth />
                        </Route>
                        <Route path="/signup">
                            <UserAuth />
                        </Route>
                        <Route
                            path="/mydash"
                            render={() =>
                                isLoggedIn() ? (
                                    <PrivateDashboard />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </Router>
            </ChakraProvider>
        </div>
    );
}

export default App;
