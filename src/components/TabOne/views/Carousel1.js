import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  Platform,
  TouchableWithoutFeedback
} from 'react-native';

import Swiper from './Swiper';
import px2dp from '../../../util/index';
import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import {
  GET_SINGLE_EVENT,
} from '../../../constants';


const { width, height } = Dimensions.get('window');

const cutTitle = (text) => {
  if (String(text).length > 17) {
    return text.slice(0, 17) + '...';
  }
  return text;
}


class Carousel1 extends Component {

  render() {
    const { headline } = this.props;
    return (
      <Swiper 
        loop={true}
        autoplay={true}
        showsPagination={true}
        autoplayTimeout={3}
        activeDotStyle={{ backgroundColor: '#FFF' }}
        dot={<View 
        style={{
          backgroundColor:'transparent', 
          width: px2dp(8), height: px2dp(8),
          borderRadius: px2dp(4), marginLeft: px2dp(6), 
          marginRight: px2dp(6), marginTop: px2dp(1), 
          borderWidth: 1,
          borderColor: '#FFF',
          marginBottom: px2dp(3),}} />}
        dotStyle={{ backgroundColor: '#FFF'}}
        paginationStyle={{ 
          ...ifIphoneX({
            top: px2dp(-425),
          }, {
            top: px2dp(-320),
          }),
          ...Platform.select({
            android: {
              top: px2dp(-290),
            }
          })
        }}
        style={styles.container}>
        {
          headline.map((item, key) => (
            <TouchableWithoutFeedback key={key} onPress={() => this.props.navigation.navigate('TabOneScreenTwo', { title: '党建活动', data: { type: GET_SINGLE_EVENT, id: item.id }})}>  
              <View style={styles.slide}>
                {
                  item.photo ? (
                    <Image source={{ uri: item.photo }} resizeMode={'stretch'} style={[ styles.img, { opacity: this.props.imgOpacity}]} />
                  ) : (
                    <Image source={require('../../img/defaultBg.png')} resizeMode={'contain'} style={[ styles.img, { opacity: this.props.imgOpacity}]} />
                  )
                }
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} 
                  style={styles.linearGradient}
                >
                  <View style={styles.textBox}><Text style={styles.text}>{cutTitle(item.title)}</Text></View>
                </LinearGradient>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    ...ifIphoneX({
      marginTop: px2dp(20),
    }, {
      
    }),
  },
  img: {
    width: width,
    height: px2dp(184),
  },
  textBox: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: width,
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        top: px2dp(118),
      },
      android: {
        top: px2dp(100),
      }
    })
  },
  text: {
    backgroundColor: 'transparent',
    fontFamily: 'PingFangSC-Medium',
    fontSize: px2dp(18),
    color: '#FFFFFF',
  },
  linearGradient: {
    width: width,
    height: px2dp(184),
    
    position: 'absolute',
  }
});

export default Carousel1;