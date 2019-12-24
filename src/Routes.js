import React from 'react';
import {Route, Redirect, Switch } from 'react-router-dom';

import Login from './views/login/Login'
import AdminLayout from './views/admin/AdminLayout'
import Notfound from './views/notfound/Notfound'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('AuthData')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


const Routes = () => {

    return (
        <Switch>
            <Route component={Login} exact path="/" />
            <Route component={Login} exact path="/login" />
            <Route component={Notfound} exact path="/404" />
            <PrivateRoute component={AdminLayout} path="/admin" />
            <Redirect to="/404" />
        </Switch>
    );
};

export default Routes;