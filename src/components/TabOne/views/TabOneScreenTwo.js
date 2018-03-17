import React, { PureComponent } from 'react';
import { 
  Text, 
  View, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';

import Header from '../../common/Header';
import px2dp from '../../../util/index';

const { width, height } = Dimensions.get('window');

import { handleTime } from '../../../util/index';

// import base url for present photo
import { base } from '../../../util/';

class TabOneScreenTwo extends PureComponent {
  render() {
    // get the data from the parent component
    const { data } = this.props;
    console.log('data', data);
    
    return (
      <View style={styles.containerBox}>
          <ScrollView
            showsVerticalScrollIndicator={false}
           >
          {
            data && (
              <View style={styles.container}>
                <View style={styles.header}>
                  <Image source={{ uri: data.photo }} style={styles.pic} />
                  <Text style={[ styles.title, data.title && styles.head]}>{data.title}</Text>
                  <Text style={styles.time}>{data.created}</Text>
                </View>
                <View style={styles.content}>
                  <HTMLView
                    stylesheet={htmlStyles}
                    value={data.body}
                  >
                  </HTMLView>
                </View>
              </View>
            )
          }
        </ScrollView>
      </View>
    )
  }
}

// { uri: base + data.image }

const styles = StyleSheet.create({
  container: {
    top: 28,
    alignItems: 'center',
  },
  containerBox: {
    width: width,
    height: height - px2dp(50),
    paddingTop: px2dp(20),
  },
  pic: {
    width: 296,
    height: 166,
    borderRadius: 5,
  },
  head: {
    fontSize: 20,
  },
  picBox: {
    marginLeft: px2dp(60)
  },
  header: {
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#C1C1C1',
    marginBottom: 17,
  },
  title: {
    fontFamily: 'PingFangSC-Semibold',
    fontSize: 20,
    color: '#000000',
    width: 283,
    alignItems: 'center',
    marginTop: 21,
  },
  time: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 14,
    color: 'rgba(152,152,152,0.80)',
    marginTop: 8,
  },
  content: {
    width: 306,
    marginBottom: 50,
  },
  contentText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 18,
    color: '#000000',
  },
});


const htmlStyles = StyleSheet.create({
  strong: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 18,
    color: '#000000',
  },
  p: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 15,
    color: '#000000',
  },
  text: {
    fontSize: 16,
    fontFamily: 'PingFangSC-Light',
  }
});

export default TabOneScreenTwo;