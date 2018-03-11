import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import TabBarNavigation from '../components/TabBarNavigation';
import LoginScreen from './Login';
import Learning from '../components/TabTwo/views/Learning';
import DetailThree from '../components/TabTwo/views/DetailThree';
import DetailFour from '../components/TabTwo/views/DetailFour';
import AnswerPageContainer from './AnswerPageContainer';

import {
  ResultPage,
} from '../components/TabTwo/views/';

export const AppNavigation = StackNavigator(
  {
    TabBarNavigation: { 
      screen: TabBarNavigation,
    },
    Login: { screen: LoginScreen },
    Learning: { screen: Learning },
    DetailThree: { screen: DetailThree },
    DetailFour: { screen: DetailFour },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerLeft: null,
      headerStyle: Platform.OS === 'ios' ? { height: 90 } : { height: 88 },
    },
    initialRouteName: 'TabBarNavigation'
  }
);


const AppWithNavigationState = ({ dispatch, nav, getRef }) => {
  return (
    <AppNavigation 
      navigation={addNavigationHelpers({ dispatch, state: nav })} 
      ref={nav => getRef(nav)}
    />
  )
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);