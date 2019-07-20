import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './scss/global-bottom-navigation.scss';
import { useSelector } from 'react-redux';

const HomeBottomNavigation = () => {
  const bottomNavigationBackground = useSelector(
    state => state.global.bottomNavigation.background
  );

  return (
    <BottomNavigation
      className="bottom-navigation--div"
      showLabels
      style={{ background: bottomNavigationBackground }}
    >
      <BottomNavigationAction
        href=""
        icon={<FavoriteIcon href="" />}
        label="About"
      />
    </BottomNavigation>
  );
};

export default HomeBottomNavigation;
