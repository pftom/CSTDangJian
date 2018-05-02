import React, { Component } from 'react';
import { Text, View, AsyncStorage, Modal, Button , TextInput, Keyboard ,TouchableWithoutFeedback, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import {
  Toast,
} from 'antd-mobile';

import {
  LOGIN,
} from '../constants/';

class Login extends Component {

    constructor(props) {
      super(props);

      this.state = {
        value1: '',
        value2: '',
      }

      this.submit = this.submit.bind(this);
    }

    handleValueChange(value, key) {
      this.setState({
        [key]: value,
      });
    }

    successToast = (msg) => {
      Toast.success(msg);
    }

    failToast = (msg, duration) => {
      Toast.fail(msg, duration);
    }

    loadingToast = (msg) => {
      Toast.loading(msg)
    }

    componentWillReceiveProps(nextProps) {
      const { isLogin, loginSuccess, loginError  } = nextProps;

      Toast.hide();
      if (isLogin) {
        this.loadingToast('登录中...');
      } else if (loginSuccess) {
        this.successToast('登录成功！');
      } else if (loginError) {
        this.failToast('登录失败，请检查账户或网络连接！');
      }
    }
    

    submit() {
      const {
        value1,
        value2,
      } = this.state;
      const { dispatch } = this.props;

      if (value1.length !== 9) {
        this.failToast('登录失败，账号是9位学号！', 1);
      } else if (!Number(value1)) {
        this.failToast('登录失败，账号是数字', 1);
      } else if (!value2) {
        this.failToast('登录失败，密码不能为空', 1);
      } else {
        dispatch({
          type: LOGIN,
          payload: {
            username: value1,
            password: value2,
          },
        });
      }
    }

    render() {
      const { failure, isFetching, dispatch } = this.props;
      return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={require('../components/img/logo.png')} style={styles.logo} />
          <View style={styles.textInputBox}>
            <TextInput
                onChangeText={value => this.handleValueChange(value, 'value1')}
                clearButtonMode="while-editing"
                placeholder="请输入您的学号"
                placeholderTextColor="#989898"
                blurOnSubmit={false}
                autoCapitalize={'none'}
                maxLength={9}
                keyboardType={'number-pad'}
                style={[styles.textInput, styles.addBorder]} 
                returnKeyType="next" />
            <TextInput style={[styles.textInput, styles.addBorder]}
              clearButtonMode="while-editing"
              secureTextEntry={true} 
              returnKeyType="done"
              placeholder="请输入您的密码"
              maxLength={15}
              placeholderTextColor='#989898'
              onChangeText={value => this.handleValueChange(value, 'value2')}
              onSubmitEditing={() => this.submit()}
            />
          </View>
          <TouchableOpacity onPress={() => this.submit()}>
            <LinearGradient
              colors={['#FF0467', '#FC7437']}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              style={styles.textInput}
            >
              <Text style={styles.login}>登   录</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.textBox}><Text style={styles.text}>初始密码为学号，登录后请立即修改</Text></View>
        </View>
      </TouchableWithoutFeedback>
    )
    }
}

Login.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    alignItems: 'center',
  },
  logo: {
    marginTop: 102,
  },  
  login: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  textInput: {
    width: 280,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addBorder: {
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: "#D3D3D3",
      }
    }),
    marginTop: 14,
    textAlign: 'center',
  },
  textInputBox: {
    marginBottom: 26,
    marginTop: 64,
  },
  text: {
    fontFamily: 'PingFangSC-Thin',
    fontSize: 14,
    color: '#000000',
  },
  textBox: {
    marginTop: 49
  },
})



const mapStateToProps = state => {
  const { isLogin, loginSuccess, loginError } = state.auth;
  return {
    isLogin,
    loginSuccess,
    loginError,
  };
};

export default connect(mapStateToProps)(Login);