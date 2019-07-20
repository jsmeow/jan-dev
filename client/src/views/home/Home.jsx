import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import HomeBackgroundPaper from './components/paper/background/HomeBackgroundPaper';
import HomeTetrisCard from './components/card/tetris/HomeTetrisCard';
import HomeNebulonCard from './components/card/nebulon/HomeNebulonCard';
import globalActions from '../global/actions/globalActions';
import { pink } from '../../services/color/muiColors';
import './scss/home.scss';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.location.pathname === '/' &&
      dispatch(globalActions.setAppBarBackground(`${pink[500].main}30`));
  });

  useEffect(() => {
    window.location.pathname === '/' &&
      dispatch(
        globalActions.setBottomNavigationBackground(`${pink[500].main}30`)
      );
  });

  return (
    <React.Fragment>
      <HomeBackgroundPaper />
      <Grid className="home--grid-container--div" container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="flex-start" spacing={5}>
            <Grid item>
              <HomeTetrisCard />
            </Grid>
            <Grid item>
              <HomeNebulonCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
