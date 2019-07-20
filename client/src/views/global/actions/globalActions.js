const globalActions = {
  setAppBarBackground(background) {
    return {
      type: 'SET_APP_BAR_BACKGROUND',
      data: { background }
    };
  },
  setBottomNavigationBackground(background) {
    return {
      type: 'SET_BOTTOM_NAVIGATION_BACKGROUND',
      data: { background }
    };
  }
};

export default globalActions;
