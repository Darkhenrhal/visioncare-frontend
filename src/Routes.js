// Routes.js
import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';

function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
      </Routes>
    </Router>
  );
}

export default RoutesConfig;
