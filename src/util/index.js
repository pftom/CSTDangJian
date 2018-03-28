'use strict';

import { Dimensions } from 'react-native';

// import all file in one place

export * from './api';
export { default as request } from './request';
import { convertToValidQuestion }  from './questionHandler';

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

const basePx = 375;

export default function px2dp(px) {
  return px * deviceW / basePx;
}

export const handleTime = (time) => {
  const newDate = new Date(time);

  const constructTime = `${newDate.getFullYear()}年${newDate.getMonth()+1}月${newDate.getDate()}日`;
  
  return constructTime;
}

export {
  convertToValidQuestion,
}