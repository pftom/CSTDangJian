import { AsyncStorage } from 'react-native';
// the effects func from redux-saga
import { delay } from 'redux-saga';
import { call, put, take, all } from 'redux-saga/effects';
// import action constants
import {
  // get profile constants
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,

  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,

  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from '../constants/';
// import api & request function
import {
  // api 
  base,
  userApi,

  // http request function
  request,
} from '../util/';

// create get profile worker saga
function* getProfile(action) {
  try {
    // get 
    const { token } = action.payload;
    // dispatch getProfile http request
    // { id } represent `post` request body
    const profile = yield call(request.get, base + userApi.getProfile, null, token);
    // if get profile successfully, dispatch action and return profile to redux-store
    yield put({ type: GET_PROFILE_SUCCESS, payload: { profile }});
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: GET_PROFILE_ERROR, errorMsg: e });
  }
}

// get profile watcher saga
function* watchGetProfile() {
  while (true) {
    const action = yield take(GET_PROFILE);
    yield call(getProfile, action);
  }
}


// create login worker saga
function* login(action) {
  try { 
    const body = action.payload;
    const loginBody = yield call(request.post, base + userApi.login, body);

    // if success, store token
    const { token, username } = loginBody;
    yield all([
      AsyncStorage.setItem('token', token),
      AsyncStorage.setItem('username', username)
    ]);

    // dispatch success request
    yield put({ type: LOGIN_SUCCESS, payload: { loginBody }});
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: LOGIN_ERROR, errorMsg: e });
  }
}

// login watcher saga
function* watchLogin() {
  while (true) {
    const action = yield take(LOGIN);
    yield call(login, action);
  }
}

// create get profile worker saga
function* changePassword(action) {
  try {
    // get 
    const { body, token } = action.payload;
    // dispatch changePassword http request
    yield call(request.put, base + userApi.changePassword, body, token);
    // if get profile successfully, dispatch action and return profile to redux-store
    yield put({ type: CHANGE_PASSWORD_SUCCESS });
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: CHANGE_PASSWORD_ERROR, errorMsg: e });
  }
}

// get profile watcher saga
function* watchChangePassword() {
  while (true) {
    const action = yield take(CHANGE_PASSWORD);
    yield call(changePassword, action);
  }
}

// create get profile worker saga
function* updateProfile(action) {
  try {
    // get 
    const { body, token } = action.payload;
    
    // construct form data;
    let data = new FormData();

    for (let [key, value] of Object.entries(body)) {
      if (key === 'avatar') {
        data.append('avatar', { uri: value, type: 'multipart/form-data', name: 'image.jpg' });
      } else {
        data.append(key, value);
      }
    }

    // dispatch changePassword http request
    const profile = yield call(request.put, base + userApi.updateProfile, data, token, true);
    // if get profile successfully, dispatch action and return profile to redux-store
    yield put({ type: UPDATE_PROFILE_SUCCESS, payload: { profile } });
  } catch(e) {
    // if get profile error, dispatch error action & error message for better `debug`
    yield put({ type: UPDATE_PROFILE_ERROR, errorMsg: e });
  }
}

// get profile watcher saga
function* watchUpdateProfile() {
  while (true) {
    const action = yield take(UPDATE_PROFILE);
    yield call(updateProfile, action);
  }
}

// export all watcher saga in one place.
export {
  watchGetProfile,
  watchLogin,
  watchChangePassword,
  watchUpdateProfile,
}