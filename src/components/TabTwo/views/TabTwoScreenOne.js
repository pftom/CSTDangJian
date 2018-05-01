import { } from 'antd-mobile/es/button/index.native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl ,ListView, Picker, Image, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PickerView, Button } from 'antd-mobile';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import px2dp from '../../../util/';

// import Custom Page
import ResultPage from './ResultPage';

import Header from '../../common/Header';

const { width, height } = Dimensions.get('window');

// import action constants
import {
  CLEAR_EVERY_TERM_ANSWER_COUNT,
} from '../../../constants/';

// picker data
const seasons = [
  [
    {
      label: '单选题',
      value: '单选题',
    },
    {
      label: '多选题',
      value: '多选题',
    },
  ],
];

class TabTwoScreenOne extends Component {
  state = {
    kind: ['单选题'],
  };

  onChange = (kind) => {
    this.setState({ kind });
  }

  onScrollChange = (kind) => {
    this.setState({ kind });
  }

  handlePress = () => {
    const { navigation, dispatch } = this.props;
    const { kind } = this.state;
    navigation.navigate('AnswerPage', { kind: kind[0], title: '答题页面' });
    // clear this term answer success count
    dispatch({ type: CLEAR_EVERY_TERM_ANSWER_COUNT });
  }

  render() {
    const {
      everyDayAnswerCount,
      everyDayTotalCount,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.hintBox}>
          <Text style={styles.commonText}>
            今日已学
            <Text style={styles.nowTimeText}> {everyDayAnswerCount}</Text>
            <Text style={styles.symbolText}>/</Text>
            <Text style={styles.totalTimeText}>{everyDayTotalCount} </Text>
            题
          </Text>
        </View>

        <View style={styles.scrollBox}>
          <View style={styles.scrollInnerBox}>
            <PickerView
              onChange={this.onChange}
              onScrollChange={this.onScrollChange}
              value={this.state.kind}
              data={seasons}
              cascade={false}
              itemStyle={styles.itemStyle}
            />
          </View>
        </View>

        <View style={styles.btnBox}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={['#FF0467', '#FC7437']}
              style={styles.linearGradient}>
              <Text style={styles.btnText}>开始答题</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    ...ifIphoneX({
      marginTop: px2dp(40),
    }, {
      marginTop: px2dp(20),
    }),
    ...Platform.select({
      android: {
        marginTop: 0,
      }
    })
  },

  hintBox: {
    width,
    alignItems: 'center',
    marginTop: px2dp(62),
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

  scrollBox: {
    width,
    alignItems: 'center',
    marginTop: 53,
  },
  scrollInnerBox: {
    width: px2dp(200)
  },

  btnBox: {
    width,
    alignItems: 'center',
  },
  linearGradient: {
    width: px2dp(280),
    height: px2dp(45),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    backgroundColor: 'transparent',
    fontSize: px2dp(24),
    color: '#FFF',
  }
});


export default TabTwoScreenOne;