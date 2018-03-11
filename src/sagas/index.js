// import redux-saga effect function
import { all } from 'redux-saga/effects';

// import all watcher saga and run them parallel
import {
  watchGetProfile,
  watchLogin,
  watchChangePassword,
  watchUpdateProfile,
} from './user';

import {
  watchGetEvents,
  watchGetSingleEvent,
  watchGetActiveEvents,
  watchAttendEvent,
} from './events';

import {
  watchGetNews,
  watchGetSingleNews,
} from './news';

import {
  watchSendFeedback,
} from './utils';

// create & export root saga for run them parallel
export default function* rootSaga() {
  yield all([
    // run the profile watch saga
    watchGetProfile(),
    watchLogin(),
    watchChangePassword(),
    watchUpdateProfile(),

    // run the event watcher saga 
    watchGetEvents(),
    watchGetSingleEvent(),
    watchGetActiveEvents(),
    watchAttendEvent(),

    // run the news watcher saga
    watchGetNews(),
    watchGetSingleNews(),

    // run the feedback watcher saga
    watchSendFeedback(),
  ]);
}