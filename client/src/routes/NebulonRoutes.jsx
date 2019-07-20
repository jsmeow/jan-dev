import React from 'react';
import { Route } from 'react-router-dom';
import Nebulon from '../views/nebulon/Nebulon';

const NebulonRoutes = () => {
  return <Route component={Nebulon} path="/nebulon" />;
};

export default NebulonRoutes;
