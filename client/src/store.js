import { createStore, combineReducers } from 'redux';
import global from './views/global/reducer/globalReducer';

const reducers = { global };
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);

export default store;
