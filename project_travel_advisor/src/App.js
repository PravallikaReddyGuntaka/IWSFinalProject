import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ContactUs from './components/ContactUs/ContactUs';
import Home from './pages/Home';
import ResetPassword from './components/Auth/ForgotPassword/ResetPassword';
import ProtectedRoute from './helpers/ProtectRoute';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <ProtectedRoute path="/contact-us" component={ContactUs} />
        <ProtectedRoute path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
