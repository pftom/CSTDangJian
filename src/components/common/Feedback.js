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
import { FEEDBACK } from '../../constants/';

// import toast function
import { 
  failToast, 
  successToast,
  loadingToast,
} from './Toast';

const width = Dimensions.get('window').width;

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackContent: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      isFeedbacking,
      feedbackSuccess,
      feedbackError,
    } = nextProps;

    const that = this;

    if (isFeedbacking) {
      loadingToast('提交反馈中...', 3);
    }

    if (feedbackSuccess) {
      Toast.hide();
      successToast('提交反馈成功!', 2);
      
      that.setState({ feedbackContent: '' });
    }

    if (feedbackError) {
      Toast.hide();
      failToast('提交反馈失败，请检查网络连接！', 2);
    }
  }

  handleSubmit = (body) => {
    const { dispatch } = this.props;
    dispatch({ type: FEEDBACK, payload: { body }});
  }

  handleConfirm = () => {
    const { feedbackContent } = this.state;
    if (feedbackContent.length === 0) {
      failToast('反馈的内容不能为空哦~', 2);
    } else {
      this.handleSubmit(feedbackContent);
    }

    Keyboard.dismiss();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <List renderHeader={() => '反馈内容'} style={{  width: width }}>
            <TextareaItem 
              title="哈哈哈"
              count={120}
              rows={7}
              style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}
              placeholder="您发现了问题？或者您有更好的改进意见？都希望您能写下宝贵的反馈，帮助我们持续改进~"
              placeholderTextColor="#CCC"
              multiline={true}
              value={this.state.feedbackContent}
              autoCorrect={false}
              returnKeyType="done"
              clearButtonMode="while-editing"
              onChange={(value) => this.setState({ feedbackContent: value })}
            >
            </TextareaItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button 
            style={styles.feedBtn}
            onClick={this.handleConfirm}
          > 
            <Text style={{ color: '#FF3B30' }}>提交反馈</Text>
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
  }
  
})