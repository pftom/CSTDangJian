import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import AppNavigation from './containers/AppNavigation';
import Login from './containers/Login';
import { SET_TOKEN } from './constants';

import { NavigationActions } from 'react-navigation';

// initial store state
import { persistor } from './store';

class App extends Component {

  componentDidMount() {
    
  }

  getRef = (nav) => {
    this.navigator = nav;
  }

  render() {
    return <AppNavigation getRef={this.getRef} />
  }
}

export default App;