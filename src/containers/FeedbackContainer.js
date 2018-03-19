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
  Feedback,
} from '../components/common/';
// create container component
class FeedbackContainer extends PureComponent {

  render() {
    return (
      <Feedback {...this.props} />
    );
  }
}

FeedbackContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ height: 90 }}>
      <Header 
        headerText="意见反馈"
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
    const { 
      isFeedbacking,
      feedbackSuccess,
      feedbackError,
     } = state.feedback;
    // inject the data in AccountContainer
    // use destruction for return new object every time(a performance method)
    return { 
      isFeedbacking,
      feedbackSuccess,
      feedbackError,
    };
  },
)(FeedbackContainer);