import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import globalActions from '../global/actions/globalActions';
import { red } from '../../services/color/muiColors';
import './scss/nebulon.scss';
import NebulonBackgroundPaper from './components/paper/background/NebulonBackgroundPaper';
import githubCorners from '../../shared/assets/svg/brand-buttons/github/github-corners';
import Game from './services/nebulon/game/Game';

const Nebulon = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const nebulonRef = useRef({});

  useEffect(() => {
    window.location.pathname === '/nebulon' &&
      dispatch(globalActions.setAppBarBackground(`${red[900].dark}90`));
  });

  useEffect(() => {
    window.location.pathname === '/nebulon' &&
      dispatch(
        globalActions.setBottomNavigationBackground(`${red[900].dark}90`)
      );
  });

  useEffect(() => {
    nebulonRef.current = new Game(canvasRef.current);
    return () => {
      nebulonRef.current.disposeGame();
      nebulonRef.current = null;
    };
  }, [canvasRef]);

  return (
    <React.Fragment>
      <div dangerouslySetInnerHTML={{ __html: githubCorners }} />
      <NebulonBackgroundPaper />
      <canvas ref={canvasRef} className="nebulon--canvas" />
    </React.Fragment>
  );
};

export default Nebulon;
