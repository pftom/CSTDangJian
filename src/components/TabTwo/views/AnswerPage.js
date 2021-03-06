import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl ,ListView, Picker, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RadioButtons } from 'react-native-radio-buttons';
import CheckBox from './CheckBox';
import { ifIphoneX } from 'react-native-iphone-x-helper';

// the compatability for all device about px
import px2dp from '../../../util/';
// the header for all component
import Header from '../../common/Header';
// import Action
import {
  ANSWER_QUESTION,
  ANSWER_QUESTION_SUCCESS,
  INCREMENT_NOW_INDEX,
} from '../../../constants/';

const { width, height } = Dimensions.get('window');

// map number to Character
const mapNumberToCharacter = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
];
const mapStatusToImage = {
  'success': require('../img/answerSuccess@3x.png'),
  'error': require('../img/error@3x.png')
}

export default class extends Component {

  state = {
    selectedOption: '',
    nowStatus: 'start',
    selectedOptions: [],
  };

  selectedColor = ['#FF0467', '#FC7437'];
  unSelectedColor = ['#DFD9D9', '#DFD9D9'];

  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate('AnswerPage');
  }

  setSelectedOption = (selectedOption) => {
    this.setState({
      selectedOption
    });
  }

  renderContainer = (optionNodes) => {
    return <View>{optionNodes}</View>;
  }

  renderOption = (option, selected, onSelect, index) => {
    const style = selected ? { fontWeight: 'bold'} : {};

    return (
      <TouchableOpacity onPress={onSelect} key={index}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          colors={
            this.state.selectedOption === option
            ? this.selectedColor
            : this.unSelectedColor
          }
          style={[styles.linearGradient, styles.addMarginBottom]}>
            <View style={styles.selectItem}>
              <Text style={styles.selectItemText}>{option}</Text>
            </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  handleNextQuestion = () => {
    const { 
      dispatch, 
      isThisTermCompleted, 
      navigation,
      everyTermAnswerCount,
      everyFecthTotalCount, 
    } = this.props;
    dispatch({ type: INCREMENT_NOW_INDEX });
    console.log('isThisTermCompleted', isThisTermCompleted)
    if (isThisTermCompleted) {
      navigation.navigate('ResultPage', { 
        headerTitle: '答题完成', 
        isQuestionResult: true,
        title: '答题结果',
        everyTermAnswerCount,
        everyFecthTotalCount,
      });
    }
    this.setState({ selectedOption: '', selectedOptions: [], nowStatus: 'start' });
  }

  handleSelect = (selectedOptions) => {
    this.setState({ selectedOptions });
  }

  handleSingleOptionRes = (dispatch, answer, options, selectedOption) => {
    const index = options.findIndex((value, index, arr) => {
      return selectedOption === value;
    });

    if (answer === mapNumberToCharacter[index]) {
      dispatch({ type: ANSWER_QUESTION_SUCCESS });
      this.setState({ nowStatus: 'success' });
    } else {
      this.setState({ nowStatus: 'error' });
    }
  }

  handleMultiOptionRes = (dispatch, answer, options, selectedOptions) => {
    // judge whether the result is true
    if (answer.length === selectedOptions.length) {
      let judgeAllOptionsIncludes = true;
      selectedOptions.map(option => {
        if (!answer.includes(option)) {
          judgeAllOptionsIncludes = false;
        }
      });

      if (!judgeAllOptionsIncludes) {
        this.setState({ nowStatus: 'error' });
      } else {
        dispatch({ type: ANSWER_QUESTION_SUCCESS });
        this.setState({ nowStatus: 'success' });
      }
    } else {
      this.setState({ nowStatus: 'error' });
    }
  }

  handleGetResult = () => {
    const {
      nowQuestion,
      dispatch,
    } = this.props;
    const { options, answer } = nowQuestion;
    const { selectedOption, selectedOptions } = this.state;

    if (answer.length > 1) {
      this.handleMultiOptionRes(dispatch, answer, options, selectedOptions);
    } else {
      this.handleSingleOptionRes(dispatch, answer, options, selectedOption);
    }
  }

  render() {
    const {
      nowQuestion,
      isThisTermCompleted,
      kind,
    } = this.props;

    const { options, answer, question } = nowQuestion;
    const { params } = this.props.navigation.state;
    const { nowStatus, selectedOption, selectedOptions } = this.state;

    console.log('selectedOptions', selectedOptions);

    // judge whether need highlight   
    let doNotHighlight = true;
    if (selectedOptions.length > 1 || selectedOption)  {
      doNotHighlight = false;
    }

    const btn = (
      <View 
        style={
          [styles.selectNextBox, doNotHighlight && styles.disabledBox ]
        }
      >
        {
          nowStatus !== 'start'
          && <Image source={mapStatusToImage[nowStatus]} style={styles.selectedImg}></Image>
        }
        <Text style={
          [styles.selectNextText, doNotHighlight && styles.disabledText]
        }>
        {
          nowStatus !== 'start'
          ? '下一题'
          : '确 认'
        }
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.questionTitle}>{question}</Text>
            <View style={styles.selectBox}>
              {
                kind === '单选题'
                ? (
                  <RadioButtons
                    options={ options }
                    onSelection={ this.setSelectedOption }
                    selectedOption={selectedOption }
                    renderOption={ this.renderOption }
                    renderContainer={ this.renderContainer }
                  />
                )
                : (
                  <CheckBox
                    options={options}
                    handleSelect={this.handleSelect}
                  />
                )
              }
            </View>

            <View style={styles.resultBox}>
              <View style={styles.resultTextBox}>
                {
                  nowStatus !== 'start'
                  && <Text style={styles.resultText}>答案：{answer}</Text>
                }
              </View>
              {
                selectedOption || selectedOptions.length > 1
                ? (
                  <TouchableOpacity 
                    onPress={
                      nowStatus !== 'start'
                      ? this.handleNextQuestion
                      : this.handleGetResult
                    }
                  >
                    {btn}
                  </TouchableOpacity>
                )
                : btn
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    ...ifIphoneX({
      paddingTop: px2dp(60),
    }, {
      paddingTop: px2dp(40),
    }),
  },
  innerContainer: {
    width: px2dp(305),
    marginTop: px2dp(30),
    marginBottom: px2dp(40),
  },

  successBox: {
    alignItems: 'center',
    marginTop: 44,
  },
  successText: {
    fontSize: px2dp(25),
    fontWeight: '400',
    marginTop: 31,
    fontWeight: '500',
  },

  hintBox: {
    width,
    alignItems: 'center',
    marginTop: px2dp(62),
    marginBottom: px2dp(63),
  },
  commonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  symbolText: {
    fontSize: 37,
    fontWeight: '500',
  },
  nowTimeText: {
    fontSize: 55,
    color: '#FF0467',
    fontWeight: '500',
  },
  totalTimeText: {
    fontSize: 30,
    fontWeight: '500',
  },

  btnBox: {
    width,
    alignItems: 'center',
  },
  linearGradient: {
    width: px2dp(302),
    borderRadius: px2dp(8),
    paddingBottom: px2dp(1),
    paddingTop: px2dp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBtn: {
    width: px2dp(153),

  },

  btnText: {
    backgroundColor: 'transparent',
    fontSize: px2dp(24),
    color: '#FFF',
  },

  questionTitle: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 20,
    color: '#000000',
  },

  selectBox: {
    marginTop: px2dp(53),
  },
  addMarginBottom: {
    marginBottom: px2dp(20),
  },
  selectItem: {
    width: px2dp(300),
    borderRadius: px2dp(7),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingLeft: px2dp(12),
    paddingRight: px2dp(12),
    paddingTop: px2dp(8),
    paddingBottom: px2dp(8),
  },
  resultText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(22),
    color: '#FF0467',
  },  
  resultBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectNextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: px2dp(6),
    paddingBottom: px2dp(6),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    borderColor: '#FF0467',
    borderRadius: 8,
    borderWidth: 1,
  },
  disabledBox: {
    borderColor: '#DFD9D9',
  },  
  disabledText: {
    color: '#655757',
  },
  selectItemText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(20),
    marginLeft: px2dp(10),
    color: '#655757',
  },
  selectNextText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(22),
    color: '#FF0467',
  },
  selectedImg: {
    marginRight: px2dp(10),
  },
});