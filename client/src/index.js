import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import * as serviceWorker from './services/cache/serviceWorker';
import { globalTheme } from './views/global/theme/globalTheme';
import Router from './router/Router';
import GlobalAppBar from './views/global/components/app-bar/GlobalAppBar';
import GlobalMainBottomNavigation from './views/global/components/bottom-navigation/GlobalBottomNavigation';
import './index.scss';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={createMuiTheme(globalTheme)}>
      <BrowserRouter location="/">
        <GlobalAppBar />
        <Router />
        <GlobalMainBottomNavigation />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
