import { combineReducers } from 'redux';

// import all action constants in one place
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,

  // profile constants
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,

  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from '../constants/';

const mapKeyToTitle = {
  'avatar': '头像',
  'name': '姓名',
  'sex': '性别',
  'identity': '身份',
  'college': '学院',
  'major': '专业',
  'studentId': '学号',
};

// profile reducer initial state
const initialProfileState = {
  userProfile: null,
  isGetProfile: false,
  getProfileSuccess: false,
  getProfileError: false,
  isUpdateProfile: false,
  updateProfileSuccess: false,
  updateProfileError: false,
  errorMsg: null,
};

// profile reducer
function profile(state = initialProfileState, action) {
  switch(action.type) {

    case GET_PROFILE:
      // if start get profile, update the status for better UI presentation
      return { 
        ...state, 
        isGetProfile: true,
        getProfileSuccess: false,
        getProfileError: false,
      };

    case GET_PROFILE_SUCCESS: {
      // if get profile success, merge profile into the state tree
      const { profile } = action.payload;
      return {
        ...state,
        userProfile: profile,
        isGetProfile: false,
        getProfileSuccess: true,
      };
    }

    case GET_PROFILE_ERROR: {
      // if get profile error, merge errorMsg for better debug
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isGetProfile: false,
        getProfileError: true,
      };

    }

      case UPDATE_PROFILE:
      // if start get profile, update the status for better UI presentation
      return { 
        ...state, 
        isUpdateProfile: true,
        updateProfileSuccess: false,
        updateProfileError: false,
      };

    case UPDATE_PROFILE_SUCCESS: {
      // if get profile success, merge profile into the state tree
      const { profile } = action.payload;
      return {
        ...state,
        userProfile: profile,
        isUpdateProfile: false,
        updateProfileSuccess: true,
      };

    }

    case UPDATE_PROFILE_ERROR: {
      // if get profile error, merge errorMsg for better debug
      const { errorMsg } = action;
      return {
        ...state,
        errorMsg,
        isUpdateProfile: false,
        updateProfileError: true,
      };
    }

    default:
      return state;
  }
}

const initialUserState = {
  isChangingPassword: false,
  changePasswordSuccess: false,
  changePasswordError: false,
}

function usersAuth (state = initialUserState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD: {
      return { 
        ...state, 
        isChangingPassword: true,
        changePasswordSuccess: false,
        changePasswordError: false,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return { 
        ...state, 
        isChangingPassword: false, 
        changePasswordSuccess: true,
      };
    }
    case CHANGE_PASSWORD_ERROR: {
      return { 
        ...state, 
        isChangingPassword: false, 
        changePasswordError: true 
      };
    }
    default: 
      return state;
  }
}

export default combineReducers({
  profile,
  usersAuth,
});