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
    const { token } = this.props;
    console.log('token', token);

    if (token) {
      return (
        <AppNavigation 
          getRef={this.getRef}
        />
      );
    }

    return ( 
      <Login />
    );
  }
}

export default connect(state => {
  return {
    token: state.auth.token,
  }
})(App);