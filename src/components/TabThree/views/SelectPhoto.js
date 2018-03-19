import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, Alert, PixelRatio, Dimensions  } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import px2dp from '../../../util/';

const options = {
  title: null,
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择照片',
  quality: 0.75,
  maxWidth: 500,
  maxHeight: 500,
  allowsEditing: true,
  nodata: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const width = Dimensions.get('window').width;

class SelectPhoto extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      avatarSource: this.props.avatar,
    };

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { avatar } = nextProps;
    if (avatar) {
      this.setState({
        avatarSource: avatar,
      });
    }
  }

  selectPhotoTapped() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        const alertMessage = '请检查网络连接，然后再试一下';
        Alert.alert(
            '上传头像出错了哦',
            alertMessage,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: response.uri,
        });

        const { handleAddPic } = this.props;
        handleAddPic && handleAddPic(response.uri, 'data:image/jpeg;base64,' + response.data)

      }
    });
  }

  render() {
    const { num } = this.props;
    const { avatarSource } = this.state;
    console.log('avatarSource', avatarSource);
    return (
      <TouchableOpacity onPress={this.selectPhotoTapped}>
        <View style={[num == 1 ? styles.avatarContainer1 : styles.avatarContainer2, styles.avatarContainer, {marginBottom: 20}]}>
        <Image style={num == 1 ? styles.avatar1 : styles.avatar2 } source={ avatarSource ? { uri: avatarSource } : require('../img/nodejs.png')} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer1: {
    marginRight: 35,
  },
  avatarContainer2: {
    width: width,
    height: 54,
    paddingLeft: 225.5,
    marginTop: 9,
  },
  avatar1: {
    borderRadius: px2dp(42.5),
    width: px2dp(85),
    height: px2dp(85),
  },
  avatar2: {
    borderRadius: 17.5,
    width: 35,
    height: 35,
    marginTop: 10.5,
  }
});

export default SelectPhoto;