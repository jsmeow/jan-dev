import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../views/home/Home';

const HomeRoutes = () => {
  return <Route component={Home} exact path="/" />;
};

export default HomeRoutes;
