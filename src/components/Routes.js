import React from 'react';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect, useRouterHistory, hashHistory, Redirect } from 'react-router';

import Posts from './Posts';
import PostPage from './PostPage';
import UserProfile from './UserProfile';
import PageNotFound from './PageNotFound';

const Routes =(
    <Router history={browserHistory}>
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
        <Redirect from="*" to={"/page-not-found/"} />
    </Router>
)

export default Routes;