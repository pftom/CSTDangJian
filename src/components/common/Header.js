import React from 'react';
import { Image, Alert, Text, StyleSheet, Platform, View, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import px2dp from '../../util/index';

const width = Dimensions.get('window').width;

const Header = (props) => {
  let style = null;
  if (Platform.OS === 'android' && !!props.logoLeft)  {
    style = {
      marginLeft: -34,
    }
  }
  return (
      <LinearGradient
        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
        colors={['#FF0467', '#FC7437']}
        style={styles.linearGradient}>
        {!!props.logoLeft && <TouchableOpacity 
                              onPress={() => props.navigation.goBack()} 
                             >
                              <View style={styles.logoLeftBox}>
                                <Image source={!!props.logoLeft && props.logoLeft} style={styles.logoLeft} />
                              </View>
                             </TouchableOpacity>}
        <Text style={[styles.headerText, props.logoLeft && styles.minusLeft]}>{props.headerText}</Text>
        <TouchableOpacity style={styles.logoBox} onPress={() => Alert.alert('功能即将上线')}>
          {
            !!props.logoRight && <Image source={props.logoRight} />
          }
          {
            !!props.logoText &&  <Text style={styles.logoText}>{props.logoText}</Text>
          }
        </TouchableOpacity>
        <View style={styles.logoShareBox}>
          {
            !!props.logoShare && <Image source={props.logoShare} /> 
          }
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    ...ifIphoneX({
      height: 110,
    }, {
      height: 90,
    }),
    flexDirection: 'row',
    width: width,
    ...Platform.select({
      ios: {
        shadowColor: '#D0011B',
        shadowOffset: { width: 0, height: 3},
        shadowRadius: 40,
        shadowOpacity: 0.5,
      },
      android: {
        marginTop: px2dp(0),
      }
    })
  },
  headerText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 24,
    color: '#FFF',
    width: px2dp(96),
    ...Platform.select({
      ios: {
        left: px2dp(145),
        ...ifIphoneX({
          top: 55,
        }, {
          top: 39,
        })
      },
      android: {
        left: px2dp(width / 2 - 63),
        fontSize: 24,
        top: 34
      }
    }),
    height: 33,
    backgroundColor: 'transparent',
  },
  minusLeft: {
    ...Platform.select({
      ios: {
        left: px2dp(90),
        ...ifIphoneX({
          top: 57,
        }, {
          top: 39,
        })
      },
      android: {
        left: px2dp(width / 2 - 63),
        fontSize: 24,
        top: 34
      }
    }),
  },
  logoBox: {
    ...Platform.select({
      ios: {
        left: 231,
        top: 31,
      },
      android: {
        left: width - px2dp(145),
        top: 24,
        alignItems: 'center',
      }
    }),
  },
  logoLeftBox: {
    height: px2dp(90),
    width: px2dp(50),
    ...ifIphoneX({
      top: 20,
    })
  },  
  logoText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        left: -10,
      },
    }),
    top: 6,
    height: 25,
  },
  logoLeft: {
    ...Platform.select({
      ios: {
        position: 'absolute',
        left: 23,
        top: 41,
      },
      android: {
        marginLeft: 23,
        marginTop: 41,
      }
    })
  },
  logoShareBox: {
    left: 222,
    top: 41,
  },
})

export default Header;