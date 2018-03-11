import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView , Dimensions, StyleSheet, PixelRatio, Platform,
  Keyboard, 
  TouchableWithoutFeedback,
} from 'react-native';

import { List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank, Modal, Toast } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

import Header from './Header';
import px2dp from '../../util/';
import { CHANGE_PASSWORD } from '../../constants/';

// import toast function
import { 
  failToast, 
  successToast,
  loadingToast,
} from './Toast';

const width = Dimensions.get('window').width;

const PLACEHOLDER = [
  {
    id: 1,
    placeholder: '请输入当前密码',
    title: 'oldPasswd',
  },
  {
    id: 2,
    placeholder: '请输入新密码',
    title: 'newPasswd',
  },
  {
    id: 3,
    placeholder: '请再次输入新密码',
    title: 'newPasswd2',
  }
]

export default class ModifyContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPasswd: '',
      newPasswd: '',
      newPasswd2: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      isChangingPassword,
      changePasswordSuccess,
      changePasswordError,
    } = nextProps;

    const that = this;

    if (isChangingPassword) {
      loadingToast('修改密码中...', 3);
    }

    if (changePasswordSuccess) {
      Toast.hide();
      successToast('修改密码成功!', 2);
      
      that.setState({ 
        oldPasswd: '',
        newPasswd: '',
        newPasswd2: '',
      });
    }

    if (changePasswordError) {
      Toast.hide();
      failToast('修改密码失败，请检查旧密码是否正确或网络连接!', 2);
    }
  }

  handleSubmit = (body, token) => {
    const { dispatch } = this.props;
    dispatch({ type: CHANGE_PASSWORD, payload: { body, token }});
  }

  handleConfirm = () => {
    const { oldPasswd, newPasswd, newPasswd2 } = this.state;
    if (!oldPasswd || !newPasswd || !newPasswd2) {
      failToast('输入的密码不能为空哟~', 2);
    } else if (newPasswd !== newPasswd2) {
      failToast('两次输入的新密码要相同哟~', 2)
    } else {
      const { username, token } = this.props;
      this.handleSubmit({
        username,
        password: newPasswd,
      }, token);
    }

    Keyboard.dismiss();
  }

  handleTextChange(text, title) {
    this.setState({ [title]: text });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <List renderHeader={() => '输入密码'} style={{  width: width }}>
            {
              PLACEHOLDER.map((item, key) => (
                <InputItem
                  placeholder={item.placeholder}
                  onChange={(value) => this.handleTextChange(value, item.title)}
                  key={item.id}
                  autoCorrect={false}
                  returnKeyType="done"
                  clearButtonMode="while-editing"
                  value={this.state[item.title]}
                />
              ))
            }
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button 
            style={styles.feedBtn}
            onClick={this.handleConfirm}
          > 
            <Text style={{ color: '#FF3B30' }}>确认修改</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    paddingTop: px2dp(30),
  },
  feedBtn: {
    borderWidth: 0,
    borderRadius: 0,
  },
})