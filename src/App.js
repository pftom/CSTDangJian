import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import AppNavigation from './containers/AppNavigation';
import Login from './containers/Login';
import { SET_TOKEN } from './constants';

import { NavigationActions } from 'react-navigation';

class App extends Component {

  async componentDidMount() {
    const that = this;
    const token = await AsyncStorage.getItem('token');

    console.log('navigator', this.navigator);
    if (!token) {
      console.log('login');
      this.navigator && this.navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Login' })
      );
    }
  }

  getRef = (nav) => {
    this.navigator = nav;
  }

  render() {
    return <AppNavigation getRef={this.getRef} />
  }
}

export default App;