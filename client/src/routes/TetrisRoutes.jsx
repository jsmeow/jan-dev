import React from 'react';
import { Route } from 'react-router-dom';
import Tetris from '../views/tetris/Tetris';

const TetrisRoutes = () => {
  return <Route component={Tetris} path="/tetris" />;
};

export default TetrisRoutes;
