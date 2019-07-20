import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import './scss/fading-app-bar.scss';
import { grey } from '../../../services/color/muiColors';

const FadingAppBar = ({ background, children }) => {
  const toolbarRef = useRef(null);

  const [pageYOffset, setPageYOffset] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState(
    'fading-app-bar--bg__solid'
  );

  useEffect(() => {
    setBackgroundClass(
      pageYOffset < toolbarRef.current.getBoundingClientRect().height
        ? 'fading-app-bar--bg__solid'
        : 'fading-app-bar--bg__transparent'
    );
  }, [pageYOffset]);

  window.addEventListener(
    'scroll',
    () =>
      setPageYOffset(window.pageYOffset || document.documentElement.scrollTop),
    false
  );

  return (
    <AppBar
      className={`fading-app-bar ${backgroundClass}`}
      style={{ background: `${background}` }}
    >
      <div ref={toolbarRef}>
        <Toolbar>{children}</Toolbar>
      </div>
    </AppBar>
  );
};

FadingAppBar.propTypes = {
  background: PropTypes.string,
  children: PropTypes.array.isRequired
};

FadingAppBar.defaultProps = {
  background: grey[900].main
};

export default FadingAppBar;
