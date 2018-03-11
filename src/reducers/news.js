import { combineReducers } from 'redux';

// import action constants in one place
import {
  // all news
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_ERROR,
  // single news
  GET_SINGLE_NEWS,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_ERROR,
} from '../constants/';

// construct initial need attend events state
const initialNewsState = {
  isGettingNews: false,
  getNewSuccess: false,
  getNewsError: false,
  news: null,
  errorMsg: null,
};

const news = (state = initialNewsState, action) => {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        isGettingNews: true,
        getNewSuccess: false,
        getNewsError: false,
      };

    case GET_NEWS_SUCCESS:
      // if get news success, merge the res into the state tree
      const { news, active, mode } = action.payload;
      
      let newNews = {};

      if (mode === 'footer') {
        const { news: oldNews } = state;
        if (oldNews) {
          newNews = { 
            ...news,
            results: oldNews.results.concat(news.results)
          };
        }
      }

      if (Object.keys(newNews).length === 0) {
        newNews = news;
      }

      return {
        ...state,
        news: newNews,
        isGettingNews: false,
        getNewSuccess: true,
      };

    case GET_NEWS_ERROR:
      // if get news error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingNews: false,
        getNewsError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};


// construct initial single news state
const initialSingleNewsState = {
  isGettingSingleNews: false,
  getSingleNewsSuccess: false,
  getSingleNewsError: false,
  singleNews: null,
  errorMsg: null,
};

const singleNews = (state = initialSingleNewsState, action) => {
  switch (action.type) {
    case GET_SINGLE_NEWS:
      return {
        ...state,
        isGettingSingleNews: true,
        getSingleNewsSuccess: false,
        getSingleNewsError: false,
      };

    case GET_SINGLE_NEWS_SUCCESS:
      // if get events success, merge the res into the state tree
      const { singleNews } = action.payload;

      return {
        ...state,
        singleNews,
        isGettingSingleNews: false,
        getSingleNewsSuccess: true,
      };

    case GET_SINGLE_NEWS_ERROR:
      // if get events error, merge error message into the state tree
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGettingSingleNews: false,
        getSingleNewsError: true,
      };

    default:
      // if dissatisfy other circumstance, return the origin state
      return state;
  }
};

export default combineReducers({
  news,
  singleNews,
});