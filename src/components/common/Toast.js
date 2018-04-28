import React from 'react';
import { Toast } from 'antd-mobile';

function showToast(msg, time) {
  Toast.info(msg, time);
}

function showToastNoMask(msg, time) {
  Toast.info(msg, time, null, false);
}

function successToast(msg, time, action, dispatch) {
  Toast.success(msg, time, () => {
    if (action && dispatch) {
      dispatch({ type: action });
    }
  });
}

function failToast(msg, time, action, dispatch) {
  Toast.fail(msg, time, () => {
    if (action && dispatch) {
      dispatch({ type: action });
    }
  });
}

function offline(msg, time) {
  Toast.offline(msg, time);
}

function loadingToast(msg, time, action) {
  Toast.loading(msg, time, () => {
    console.log('Load complete !!!');
  });
}

export {
  showToast,
  showToastNoMask,
  successToast,
  failToast,
  offline,
  loadingToast,
}