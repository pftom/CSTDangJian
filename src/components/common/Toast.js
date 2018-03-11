import React from 'react';
import { Toast } from 'antd-mobile';

function showToast(msg, time) {
  Toast.info(msg, time);
}

function showToastNoMask(msg, time) {
  Toast.info(msg, time, null, false);
}

function successToast(msg, time) {
  Toast.success(msg, time);
}

function failToast(msg, time) {
  Toast.fail(msg, time);
}

function offline(msg, time) {
  Toast.offline(msg, time);
}

function loadingToast(msg, time) {
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