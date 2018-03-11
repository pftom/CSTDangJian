// the effects func from redux-saga
import { delay } from 'redux-saga';
import { call, put, take, all } from 'redux-saga/effects';
// import action constants
import {
  FEEDBACK,
  FEEDBACK_SUCCESS,
  FEEDBACK_ERROR,
} from '../constants/';
// import api & request function
import {
  // api 
  base,
  utilApi,

  // http request function
  request,
} from '../util/';

// create get profile worker saga
function* sendFeedback(action) {
  try {
    // get 
    const { body } = action.payload;

    // send feedback
    yield call(request.post, base + utilApi.feedback, { body });
    // if get profile successfully, dispatch action and return profile to redux-store
    yield put({ type: FEEDBACK_SUCCESS });
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: FEEDBACK_ERROR, errorMsg: e });
  }
}

// get profile watcher saga
function* watchSendFeedback() {
  while (true) {
    const action = yield take(FEEDBACK);
    yield call(sendFeedback, action);
  }
}

// export all watcher saga in one place.
export {
  watchSendFeedback
}