import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import TetrisBackgroundPaper from './components/paper/background/TetrisBackgroundPaper';
import githubCorners from '../../shared/assets/svg/brand-buttons/github/github-corners';
import Game from './services/tetris/Game';
import './scss/tetris.scss';
import globalActions from '../global/actions/globalActions';
import { blue, green } from '../../services/color/muiColors';

const Tetris = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const tetrisRef = useRef({});
  const [isScoreFormShown, setShowScoreForm] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    window.location.pathname === '/tetris' &&
      dispatch(globalActions.setAppBarBackground(`${blue[900].main}90`));
  });

  useEffect(() => {
    window.location.pathname === '/tetris' &&
      dispatch(
        globalActions.setBottomNavigationBackground(`${green[900].main}90`)
      );
  });

  useEffect(() => {
    tetrisRef.current = new Game(
      canvasRef.current,
      setPlayerScore,
      setShowScoreForm,
      Tetris.getHighScores
    );
    return () => {
      tetrisRef.current.dispose();
      tetrisRef.current = null;
    };
  }, [canvasRef]);

  const handleChange = event => {
    const name = event.target.value;
    name.length <= 5 && setPlayerName(name);
  };

  return (
    <React.Fragment>
      <TetrisBackgroundPaper />
      <div dangerouslySetInnerHTML={{ __html: githubCorners }} />
      <canvas ref={canvasRef} className="tetris--canvas" />
      {isScoreFormShown && (
        <form
          autoComplete="off"
          className="tetris--player-name--form"
          noValidate
          onSubmit={() =>
            Tetris.postHighScore({ name: playerName, score: playerScore })
          }
        >
          <TextField
            id="player-name"
            InputProps={{
              classes: {
                input: 'tetris--player-name--form--input'
              }
            }}
            margin="normal"
            onChange={handleChange}
            value={playerName}
            variant="outlined"
          />
        </form>
      )}
    </React.Fragment>
  );
};

Tetris.getHighScores = function() {
  return fetch('http://localhost:3000/tetris/getHighScores', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.json();
  });
};

Tetris.postHighScore = function({ date = new Date(), name = '', score = 0 }) {
  fetch('http://localhost:3000/tetris/postHighScore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date,
      name,
      score
    })
  })
    .then(response => {
      return response.json();
    })
    .then(highScores => {
      console.log(highScores);
    });
};

export default Tetris;
