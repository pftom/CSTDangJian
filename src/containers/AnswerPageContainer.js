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
      isThisTermCompleted,
      everyTermAnswerCount,
      everyFecthTotalCount,
      dispatch,
      everyDayNowQuestionIndex,
      singleOptionQuestions,
      multiOptionQuestions,
    } = this.props;

    const { kind } = navigation.state.params;
    console.log('kind', kind);
    const nowQuestion = (
      kind === '单选题'
      ? singleOptionQuestions[everyDayNowQuestionIndex]
      : multiOptionQuestions[everyDayNowQuestionIndex]
    );

    console.log('question', nowQuestion);
    
    return (
      <AnswerPage
        navigation={navigation}
        nowQuestion={nowQuestion}
        isThisTermCompleted={isThisTermCompleted}
        dispatch={dispatch}
        kind={kind}
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
      singleOptionQuestions,
      multiOptionQuestions,
      everyTermAnswerCount,
    } = state.answer;
    return {
      isThisTermCompleted: everyDayNowQuestionIndex >= everyFecthTotalCount - 1,
      everyTermAnswerCount,
      everyFecthTotalCount,
      singleOptionQuestions,
      multiOptionQuestions,
      everyDayNowQuestionIndex,
    };
  },
)(AnswerPageContainer);