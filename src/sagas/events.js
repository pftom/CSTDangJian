// the effects func from redux-saga
import { call, put, take } from 'redux-saga/effects';
// import action constants
import {
  // get need attend action constants
  GET_EVENTS,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,

  // get single attend action constants
  GET_SINGLE_EVENT,
  GET_SINGLE_EVENT_SUCCESS,
  GET_SINGLE_EVENT_ERROR,

  GET_ACTIVE_EVENTS_SUCCESS,
  GET_ACTIVE_EVENTS,
  GET_ACTIVE_EVENTS_ERROR,

  ATTEND,
  ATTEND_SUCCESS,
  ATTEND_ERROR,
} from '../constants/';
// import api & request function
import {
  // api 
  base,
  homeApi,
  // http request function
  request,
} from '../util/';

// create get need attend worker saga
function* getEvents(action) {
  try {
    const { active, mode, next } = action.payload;
    // a object for judge whether 
    let events = [];
    if (active) {
      if (mode === 'footer' && !!next) {
        events = yield call( request.get, next, { active: true });
      } else if (mode === 'header') {
        events = yield call( request.get, base + homeApi().getEvents, { active: true } );
      } else {
        return;
      }
      
    } else {
      if (mode === 'footer' && !!next ) {
        events = yield call( request.get, next);
      } else if (mode === 'header') {
        events = yield call( request.get, base + homeApi().getEvents);
      } else {
        return;
      }
    }
    // dispatch getEvents http request
    // { active: true } represent the request events is the attend events
    
    // if get need attend  successfully, dispatch action and return needAttendEvents to redux-store
    yield put({ type: GET_EVENTS_SUCCESS, payload: { events, active, mode }});
  } catch(e) {
    // if get need attend error, dispatch error action & error message for better `debug`
    yield put({ type: GET_EVENTS_ERROR, errorMsg: e });
  }
}

// get need attend watcher saga
function* watchGetEvents() {
  while (true) {
    // LISTEN GET_ATTEND
    const action = yield take(GET_EVENTS);
    yield call(getEvents, action);
  }
}

// get need attend watcher saga
function* watchGetActiveEvents() {
  while (true) {
    // LISTEN GET_ATTEND
    const action = yield take(GET_ACTIVE_EVENTS);
    yield call(getEvents, action);
  }
}

// create get single need attend worker saga
function* getSingleEvent(action) {
  try {
    const { id } = action.payload;
    // dispatch getSingleEvent http request
    // { active: true } represent the request events is the attend events
    const singleEvent = yield call( request.get, base + homeApi(id).getSingleEvent );
    // if get single need attend  successfully, dispatch action and return needAttendEvents to redux-store
    yield put({ type: GET_SINGLE_EVENT_SUCCESS, payload: { singleEvent }});
  } catch(e) {
    // if get single need attend error, dispatch error action & error message for better `debug`
    yield put({ type: GET_SINGLE_EVENT_ERROR, errorMsg: e });
  }
}

// get need attend watcher saga
function* watchGetSingleEvent() {
  while (true) {
    // LISTEN GET_ATTEND
    const action = yield take(GET_SINGLE_EVENT);
    yield call(getSingleEvent, action);
  }
}

// create get single need attend worker saga
function* attendEvent(action) {
  try {
    const { id, token } = action.payload;
    // dispatch getSingleEvent http request
    // { active: true } represent the request events is the attend events
    yield call( request.get, base + homeApi(id).attendEvent, null, token );
    // if get single need attend  successfully, dispatch action and return needAttendEvents to redux-store
    yield put({ type: ATTEND_SUCCESS });
  } catch(e) {
    // if get single need attend error, dispatch error action & error message for better `debug`
    yield put({ type: ATTEND_ERROR, errorMsg: e });
  }
}

// get need attend watcher saga
function* watchAttendEvent() {
  while (true) {
    // LISTEN GET_ATTEND
    const action = yield take(ATTEND);
    yield call(attendEvent, action);
  }
}

// export all watcher saga in one place.
export {
  watchGetEvents,
  watchGetSingleEvent,
  watchGetActiveEvents,
  watchAttendEvent,
}