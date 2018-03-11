// the effects func from redux-saga
import { call, put, take } from 'redux-saga/effects';
// import action constants
import {
  // get need attend action constants
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,

  // get single attend action constants
  GET_SINGLE_NEWS,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_ERROR,
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
function* getNews(action) {
  try {

    const { active, mode, next } = action.payload;
    // a object for judge whether 
    let news = [];
    if (active) {
      news = yield call( request.get, base + homeApi().getNews, { active: true } );
    } else {
      if (mode === 'footer' && !!next ) {
        news = yield call( request.get, next);
      } else if (mode === 'header') {
        news = yield call( request.get, base + homeApi().getNews);
      } else {
        return;
      }
    }
    // if get news  successfully, dispatch action and return news to redux-store
    yield put({ type: GET_NEWS_SUCCESS, payload: { news, active, mode }});
  } catch(e) {
    // if get news error, dispatch error action & error message for better `debug`
    yield put({ type: GET_NEWS_ERROR, errorMsg: e });
  }
}

// get news watcher saga
function* watchGetNews() {
  while (true) {
    // LISTEN GET_NEWS
    const action = yield take(GET_NEWS);
    yield call(getNews, action);
  }
}

// create get single news worker saga
function* getSingleNews(action) {
  try {
    const { id } = action.payload;
    // dispatch getSingleNews http request
    const singleNews = yield call( request.get, base + homeApi(id).getSingleNews );
    // if get  single new  successfully, dispatch action and return singleNews to redux-store
    yield put({ type: GET_SINGLE_NEWS_SUCCESS, payload: { singleNews }});
  } catch(e) {
    // if get  single new error, dispatch error action & error message for better `debug`
    yield put({ type: GET_SINGLE_NEWS_ERROR, errorMsg: e });
  }
}

// get news watcher saga
function* watchGetSingleNews() {
  while (true) {
    // LISTEN GET_SINGLE_NEWS
    const action = yield take(GET_SINGLE_NEWS);
    yield call(getSingleNews, action);
  }
}

// export all watcher saga in one place.
export {
  watchGetNews,
  watchGetSingleNews,
}