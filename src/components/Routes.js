import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';

import HomePage from './HomePage';
import Posts from './Posts';
import PostPage from './PostPage';
import UserProfile from './UserProfile';
import PageNotFound from './PageNotFound';

const Routes = (
    <Router history={browserHistory}>
        <Route 
            path="/"
            component={HomePage}    
        >
            <IndexRedirect to="/posts/"/>
            <Route
                path="/posts/"
                component={Posts}
            />
            <Route
                path="/posts/:postId/"
                component={PostPage}
            />
            <Route
                path="/users/:userId/"
                component={UserProfile}
            />
            <Route
                path="/page-not-found/"
                component={PageNotFound}
            />
        </Route>
        <Redirect from="*" to="/page-not-found/" />
    </Router>
)

export default Routes;