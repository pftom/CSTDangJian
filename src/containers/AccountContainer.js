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
  TabThreeScreenOne,
} from '../components/TabThree/views/';
// import action constants for get profile
import { GET_PROFILE } from '../constants/';

// create container component
class AccountContainer extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: GET_PROFILE, payload: { token: "ce2fa48c680caf20224d463fd41bd53d603c1a91" } });
  }

  render() {
    // get profile from the props
    const { profile, navigation, dispatch, token } = this.props;
    const { userProfile } = profile;
    return (
      <TabThreeScreenOne 
        {...profile}
        profile={userProfile} 
        navigation={navigation} 
        dispatch={dispatch}
        token={token}
      />
    );
  }
}

AccountContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ height: 90 }}>
      <Header 
        headerText="我的账号"
        navigation={navigation}
      />
    </View>
  ),
})

// connect the component and get data from the redux-store
export default connect(
  // mapStateToProps
  state => {
    // get the profile reducer state section from the user
    const { profile } = state.users;
    const { token } = state.auth;
    // inject the data in AccountContainer
    // use destruction for return new object every time(a performance method)
    return { profile, token };
  },
)(AccountContainer);