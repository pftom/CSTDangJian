// react component all need package
import React, { PureComponent } from 'react';
// import component from react-native
import { View } from 'react-native';
// import react bind library connect
import { connect } from 'react-redux';
// import presentation component
import { 
  TabTwoScreenOne,
  ResultPage,
} from '../components/TabTwo/views/';
// import Header from common
import { Header } from '../components/common/';

// import action constants
import {
  GET_SINGLE_EVENT,
  GET_SINGLE_NEWS,
} from '../constants/';


class TabTwoScreenOneContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {
  }

  render() {
    const {
      navigation,
      dispatch,
      everyDayAnswerCount,
      everyDayTotalCount,
      isCompleted,
    } = this.props;
    
    return (
      !isCompleted
      ? (
        <TabTwoScreenOne
          navigation={navigation}
          dispatch={dispatch}
          everyDayAnswerCount={everyDayAnswerCount}
          everyDayTotalCount={everyDayTotalCount}
        />
      )
      : (
        <ResultPage
          headerTitle='在线学习'
        />
      )
    );
  }
}

// define the header for this component
TabTwoScreenOneContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ height: 90 }}>
      <Header 
        headerText="在线学习"
        navigation={navigation}
      />
    </View>
  ),
  headerLeft: null,
  gesturesEnabled: false,
})

export default connect(
  // mapStateToProps
  state => {
    // get the answer state from the state tree
    const { 
      everyDayAnswerCount,
      everyDayTotalCount,
      everyFecthTotalCount,
      everyDayNowQuestionIndex,
      questions,
      everyTermAnswerCount,
    } = state.answer;
    return {
      isCompleted: everyDayAnswerCount >= everyDayTotalCount,
      everyDayAnswerCount,
      everyDayTotalCount,
    };
  },
)(TabTwoScreenOneContainer);