import React, { PureComponent } from 'react';
import { 
  WebView,
  Platform,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import px2dp from '../../../util/index';

class TabOneScreenTwo extends PureComponent {
  render() {
    // get the data from the parent component
    const { data } = this.props;

    const uri = 'https://mp.weixin.qq.com/s?__biz=MzIyODEwNDk5NQ==&mid=2649605841&idx=1&sn=384cbef5554fd2ffb2a9567ed7b5c696&chksm=f04e689dc739e18b637af6f0748e5cbcde45e1f6851eddd3b033669351b45f5dc8badcb752c1&mpshare=1&scene=23&srcid=0322AGA146wopCmRBRGUOv7Q#rd';
    
    return (
      <WebView
        source={{ uri }}
        style={{ 
          ...ifIphoneX({
            marginTop: px2dp(43),
          }, {
            marginTop: px2dp(24)
          }),
          ...Platform.select({
            android: {
              marginTop: px2dp(0),
            }
          })
        }}
      />
    )
  }
}

export default TabOneScreenTwo;