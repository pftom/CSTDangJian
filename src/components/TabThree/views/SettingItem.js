import React from 'react';
import { Text, Image, View, StyleSheet, } from 'react-native';

import px2dp from '../../../util/';

const SettingItem = (props) => (
  <View style={styles.container}>
    <View style={styles.upSide}>
      <Image source={props.leftIcon} style={styles.leftIcon} />
      {
        !!props.messageNum && <View style={styles.messageBox}><Text style={styles.message}>{props.messageNum}</Text></View>
      }
    </View>
    <Text style={styles.category}>{props.category}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginTop: px2dp(20),
    width: px2dp(128),
    height: px2dp(128),
    shadowRadius: px2dp(40),
    shadowColor: '#C7C7C7',
    shadowOpacity: 0.32,
    marginRight: px2dp(32),
  },
  upSide: {
    flexDirection: 'row',
  },
  leftIcon: {
    margin: px2dp(20),
    height: px2dp(40),
    width: px2dp(40),
  },
  category: {
    marginLeft: px2dp(20),
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(18),
    color: 'rgba(0,0,0,0.80)',
    marginTop: px2dp(12.5),
  },
  messageBox: {
    height: px2dp(24),
    width: px2dp(24),
    marginTop: px2dp(12),
    borderRadius: px2dp(12),
    backgroundColor: '#FF3B30',
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#FF3B30',
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: px2dp(12),
  },
  message: {
    backgroundColor: 'transparent',
    fontFamily: '.AppleSystemUIFont',
    fontSize: px2dp(14),
    color: '#FFFFFF',
  }
})

export default SettingItem;