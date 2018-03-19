import { } from 'antd-mobile/es/button/index.native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl ,ListView, Picker, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// the compatability for all device about px
import px2dp from '../../../util/';
// the header for all component
import Header from '../../common/Header';

const { width, height } = Dimensions.get('window');

export default class extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View>
        <Header 
          headerText={navigation.state.params.title}
          navigation={navigation}
        />
      </View>
    ),
    gesturesEnabled: false,
    headerLeft: null,
    tabBarVisible: false,
  });

  handlePress = () => {
    const { navigation } = this.props;
    navigation.navigate('TabTwoScreenOneContainer');
  }

  render() {
    const completedColor = ['#9B9B9B', '#9B9B9B'];
    const unCompletedColor = ['#FF0467', '#FC7437'];

    const { navigation } = this.props;
    let { headerTitle } = this.props;
    let hintBox = null;
    let btn = null;

    if (navigation) {
      const { 
        isQuestionResult,
        everyFecthTotalCount,
        everyTermAnswerCount,      
      } = navigation.state.params;

      headerTitle = navigation.state.params.headerTitle;

      if (isQuestionResult) {
        hintBox = (
          <View style={styles.hintBox}>
            <Text style={styles.commonText}>
              本次成绩
              <Text style={styles.nowTimeText}> {everyTermAnswerCount}</Text>
              <Text style={styles.symbolText}>/</Text>
              <Text style={styles.totalTimeText}>{everyFecthTotalCount} </Text>
              题
            </Text>
          </View>
        );

        btn = (
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={unCompletedColor}
              style={styles.linearGradient}>
              <Text style={styles.btnText}>回首页</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        );
      }
    } else {
      hintBox = (
        <View style={styles.hintBox}>
          <Text style={styles.commonText}>
            今日已学
            <Text style={styles.nowTimeText}> 30</Text>
            <Text style={styles.symbolText}>/</Text>
            <Text style={styles.totalTimeText}>30 </Text>
            题
          </Text>
        </View>
      );

      btn = (
        <LinearGradient
          start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
          colors={completedColor}
          style={styles.linearGradient}>
          <Text style={styles.btnText}>任务完成</Text>
        </LinearGradient>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.resultBox}>
          <Image source={require('../img/success.png')} style={styles.resultImg}></Image>
          <Text style={styles.resultText}>{headerTitle}</Text>
        </View>

        {hintBox}

        <View style={styles.btnBox}>
          {btn}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: px2dp(80),
  },
  hintBox: {
    width,
    alignItems: 'center',
    marginTop: 52,
    marginBottom: 63,
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
  },

  resultBox: {
    alignItems: 'center',
    marginTop: 44,
  },
  resultText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 32,
    color: '#000000',
    marginTop: 31,
  },
});