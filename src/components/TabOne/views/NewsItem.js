import React from 'react';
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';

import { handleTime } from '../../../util/index';

// import base url for present images
import px2dp, { base } from '../../../util/';

const width = Dimensions.get('window').width;

// { uri: base + props.image }

const NewsItem = (props) => {
  let title = props.title;

  if (title.length >= 20) {
    title = title.slice(0, 20);
    title += '...';
  }
  
  return (
    <View style={styles.container}>
      {
        props.photo ? (
          <Image source={{ uri: props.photo }} style={styles.pic} />
        ) : (
          <Image source={require('../../img/defaultBg.png')} style={styles.pic} />
        )
      }
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{props.created}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    borderBottomColor: '#D0021B',
    borderBottomWidth: 0.5,
    paddingTop: px2dp(10),
    paddingBottom: px2dp(10),
    backgroundColor: '#fff',
  },
  pic: {
    width: px2dp(124),
    height: px2dp(78),
    borderRadius: 5,
    left: px2dp(17),
  },
  textBox: {
    width: px2dp(190),
    height: px2dp(78),
    marginLeft: px2dp(45),
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(16),
    color: 'rgba(0,0,0,0.80)',
  },
  time: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(14),
    color: 'rgba(152,152,152,0.80)',
    marginTop: px2dp(5)
  }
})

export default NewsItem;