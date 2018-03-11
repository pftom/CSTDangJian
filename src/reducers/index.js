import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import nav from './nav';
import auth from './auth';
import storage from './storage';
import home from './home';
// add improvement for the reducer
import users from './users';
import events from './events';
import news from './news';
import answer from './answer';
import feedback from './feedback';
import content from './content';

const AppReducers = combineReducers({
  nav,
  auth,
  home,
  storage,
  content,
  
  users,
  events,
  news,
  answer,
  feedback,
  form: formReducer,
});

export default AppReducers;