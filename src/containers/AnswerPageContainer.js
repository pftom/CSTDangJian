// react component all need package
import React, { PureComponent } from 'react';
// import component from react-native
import { View } from 'react-native';
// import react bind library connect
import { connect } from 'react-redux';
// import presentation component
import { AnswerPage } from '../components/TabTwo/views/';
// import Header from common
import { Header } from '../components/common/';


class AnswerPageContainer extends PureComponent {
  componentDidMount() {
    
  }

  render() {
    // definitely give out all need pass data in one place
    const { 
      navigation,
      isCompleted,
      nowQuestion,
      isThisTermCompleted,
      everyTermAnswerCount,
      everyFecthTotalCount,
      dispatch,
    } = this.props;
    
    return (
      <AnswerPage
        navigation={navigation}
        nowQuestion={nowQuestion}
        isThisTermCompleted={isThisTermCompleted}
        dispatch={dispatch}
        everyTermAnswerCount={everyTermAnswerCount}
        everyFecthTotalCount={everyFecthTotalCount}
      />
    );
  }
}

// define the header for this component
AnswerPageContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View>
      <Header 
        headerText={navigation.state.params.title}
        logoLeft={require('../components/TabOne/img/back.png')}
        navigation={navigation}
      />
    </View>
  ),
  gesturesEnabled: false,
  headerLeft: null,
  tabBarVisible: false,
});

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
      nowQuestion: questions[everyDayNowQuestionIndex],
      isThisTermCompleted: everyDayNowQuestionIndex >= everyFecthTotalCount - 1,
      everyTermAnswerCount,
      everyFecthTotalCount,
    };
  },
)(AnswerPageContainer);