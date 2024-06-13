import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/admin" component={Dashboard} />
            {/* Otras rutas */}
        </Switch>
    </Router>
);

export default App;

