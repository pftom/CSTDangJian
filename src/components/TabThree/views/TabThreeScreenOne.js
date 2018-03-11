import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

import { Toast } from 'antd-mobile';

import px2dp from '../../../util/index';
import Header from '../../common/Header'
import SettingItem from './SettingItem';
import SelectPhoto from './SelectPhoto';

// import base uri for present photo
import { base } from '../../../util/';

const ITEMS = [
  {
    id: 1,
    leftIcon: require('../img/message.png'),
    category: '消息通知',
    messageNum: 2,
  },
  {
    id: 2,
    leftIcon: require('../img/attend.png'),
    category: '活动签到',
    messageNum: 1,
  },
  {
    id: 3,
    leftIcon: require('../img/record.png'),
    category: '党课记录',
  },
  {
    id: 4,
    leftIcon: require('../img/settings.png'),
    category: '设置',
  },
];

// import toast function
import { 
  failToast, 
  successToast,
  loadingToast,
} from '../../common/Toast';

import { UPDATE_PROFILE } from '../../../constants/';

const SCREEN = [ "MessageBox", "ActivityBox", "PersonData", "Setting" ];

class TabThreeScreenOne extends Component {
  handleAddPic = (photo, uri) => {
    const { dispatch, profile, token } = this.props;
    dispatch({ type: UPDATE_PROFILE, payload: { body: { ...profile, avatar: photo }, token }});
  }

  componentWillReceiveProps(nextProps) {
    const {
      isUpdateProfile,
      updateProfileSuccess,
      updateProfileError,
    } = nextProps;

    const that = this;

    if (isUpdateProfile) {
      loadingToast('更新头像中...', 3);
    }

    if (updateProfileSuccess) {
      Toast.hide();
      successToast('更新头像成功!', 2);
      
    }

    if (updateProfileError) {
      Toast.hide();
      failToast('更新头像失败，请检查网络连接！', 2);
    }
  }

  render() {
    let { profile, navigation } = this.props;
    console.log('profile', profile);
    return (
      <View style={styles.container}>
        {
            <View style={styles.upSide}>
              <SelectPhoto 
                num={1} 
                avatar={profile && ( profile.avatar )} 
                handleAddPic={this.handleAddPic}
              />
              <View style={styles.rightSide}>
                <View style={styles.identityBox}>
                  <Text style={styles.name}>{profile ? profile.full_name : 'Node.js' }</Text>
                  <Text style={styles.identity}>{profile ? profile.identity : '❤️'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PersonData', { profile })}>
                  <LinearGradient
                  colors={[ '#FF0467', '#FC7437']}
                  start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                  style={styles.profileGradient}
                >
                  <View style={styles.profileBox}>
                    <Image source={require('../img/person_data.png')} style={styles.profileImg} />
                    <Text style={styles.profileText}>查看个人档案</Text>
                  </View>
                </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
        }
        <View style={styles.downSide}>
          <View style={styles.gradientBox}>
            <LinearGradient 
              style={styles.gradient} 
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}}
              colors={['rgba(255,116,116,0)', 'rgba(255,94,94,100)']}  
            />
          </View>
          <View style={styles.itemBox}>
            {
              ITEMS.map(item => <TouchableOpacity key={item.id} onPress={() => item.id === 3 ? Alert.alert('功能即将上线') : navigation.navigate(SCREEN[item.id - 1])}><SettingItem {...item}/></TouchableOpacity>)
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    top: -10,
  },
   container: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#FFF',
    paddingTop: px2dp(10),
  },
  upSide: {
    flexDirection: 'row',
    marginRight: px2dp(41),
    marginTop: 51,
  },
  rightSide: {
    marginTop: -15
  },
  name: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 24,
    color: 'rgba(0,0,0,0.80)',
  },
  identityBox: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
    marginLeft: 1,
  },
  identity: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 14,
    color: 'rgba(136,136,136,0.80)',
    marginLeft: 12,
  },
  sex: {
    marginTop: -1.5,
    marginRight: 4,
  },
  gradient: {
    width: 312,
    height: 1,
    marginTop: 29
  },
  gradientBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -25,
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginRight: -7,
    marginTop: 21,
  },
  profileGradient: {
    width: px2dp(144),
    height: px2dp(36),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  profileBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(142),
    height: px2dp(34),
    backgroundColor: '#FFF',
    borderRadius: 7,
  },
  profileText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#D0011B',
    backgroundColor: 'transparent',
  }
});

export default TabThreeScreenOne;