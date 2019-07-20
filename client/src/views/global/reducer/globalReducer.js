import { pink } from '../../../services/color/muiColors';

const initialState = {
  appBar: {
    background: `${pink[500].main}30`
  },
  bottomNavigation: {
    background: `${pink[500].main}30`
  }
};

const reducers = {
  setAppBarBackground(state, { background }) {
    Object.assign(state.appBar, { background });
    return { ...state };
  },
  setBottomNavigationBackground(state, { background }) {
    Object.assign(state.bottomNavigation, { background });
    return { ...state };
  }
};

const globalReducer = (state = initialState, { type, data }) => {
  const action = {
    SET_APP_BAR_BACKGROUND: reducers.setAppBarBackground,
    SET_BOTTOM_NAVIGATION_BACKGROUND: reducers.setBottomNavigationBackground
  }[type];
  return action ? action(state, data) : state;
};

export default globalReducer;
