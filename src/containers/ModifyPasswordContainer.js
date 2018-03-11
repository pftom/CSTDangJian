// import all need react 
import React, { PureComponent } from 'react';
// import react-native component
import { View } from 'react-native';
// import Header component
import { Header } from '../components/common/';

// import react-redux bind library for get `dispatch` property
import { connect } from 'react-redux';

// import presentaction component for receive data from the store
import {
  ModifyPassword,
} from '../components/common/';
// create container component
class ModifyPasswordContainer extends PureComponent {

  render() {
    return (
      <ModifyPassword {...this.props} />
    );
  }
}

ModifyPasswordContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View>
      <Header 
        headerText="修改密码"
        logoLeft={require('../components/TabOne/img/back.png')}
        navigation={navigation}
      />
    </View>
  ),
  headerLeft: null,
});

// connect the component and get data from the redux-store
export default connect(
  // mapStateToProps
  state => {
    // get the profile reducer state section from the user
    const usersAuth = state.users.usersAuth;
    const { token, username } = state.auth;
    // inject the data in AccountContainer
    // use destruction for return new object every time(a performance method)
    return {
      ...usersAuth,
      token,
      username,
    };
  },
)(ModifyPasswordContainer);