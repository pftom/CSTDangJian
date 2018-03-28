import React, { Component } from 'react';
import { View,  StyleSheet,  ScrollView } from 'react-native';
import SinglePicker from 'mkp-react-native-picker';
import { ifIphoneX } from 'react-native-iphone-x-helper';

// import antd-mobile component for better development
import Header from '../../common/Header';
import PersonDataItem from './DataItem';

// import base url for present image
import { base } from '../../../util/';
import px2dp from '../../../util/index';

// import antd-mobile
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = List.Brief;


// construct all need data in this function
const constructData = (data) => {
  const constructedData = [];

  // get all keys of this data
  const dataKeys = Object.keys(data);

  

  dataKeys.map((item, key) => {
    const filterKeys = Object.keys(mapKeyToTitle);

    if (filterKeys.includes(item)) {
      constructedData.push({
        id: key,
        title: mapKeyToTitle[item],
        content: data[item],
      });
    }
  });

  console.log('constructedData', constructedData);

  return constructedData;
}

// map all need render data from keys to content
const mapKeyToTitle = {
  full_name: '姓名',
  sex: '性别',
  identity: '身份',
  college: '学院',
  major: '专业',
  organization: '支部名称',
  application_date: '递交入党申请时间',
  join_date: '入党时间',
};
// map sex
const mapSex = {
  'M': '男',
  'F': '女',
};


class PersonData extends Component {

  
  render() {
    const { profile } = this.props.navigation.state.params;
    console.log('profile', profile);

    // declare what need rendered 
    let renderFirstList = [];
    let renderSecondList = [];
    // if the profile exist
    if (profile) {

      // get all the key of mapKeyToTitle
      const needRenderProfileKeys = Object.keys(mapKeyToTitle);
      let i = 0;
      for ( ; i < needRenderProfileKeys.length; i++) {
        // use a variable to replace needRenderProfileKeys[i]
        const simpleKey = needRenderProfileKeys[i];
        if (i <= 2) {
          // split the list to two section
          // if simpleKey === 'sex', do the mapSex, ep: 'M' => '男'
          renderFirstList.push({
            extra: simpleKey === 'sex' ? mapSex[ profile[ simpleKey ] ] : profile[ simpleKey ],
            content: mapKeyToTitle[ simpleKey ],
          })
        } else {
          renderSecondList.push({
            extra: profile[ simpleKey ],
            content: mapKeyToTitle[ simpleKey ],
          })
        }
      }
    }

    
    return (
      <ScrollView style={styles.container}>
        <List style={styles.firstList}>
          {
            renderFirstList.map((item, key) => (
              <Item extra={item.extra} key={key}>{item.content}</Item>
            ))
          }
        </List>

        <List style={styles.secondList}>
          {
            renderSecondList.map((item, key) => (
              <Item 
                extra={
                  item.extra 
                  ? item.extra
                  : '暂无'
                } 
                key={key}
              >
                {item.content}
              </Item>
            ))
          }
        </List>
      </ScrollView>
    )
  }
}

PersonData.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ height: 90 }}>
      <Header 
        logoLeft={require('../../TabOne/img/back.png')}
        headerText="个人档案"
        navigation={navigation}
      />
    </View>
  ),
  headerLeft: null,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
    ...ifIphoneX({
      marginTop: px2dp(30),
    }, {
      paddingTop: px2dp(10),
    }),
  },
  itemContainer: {
    shadowOffset: { x: 0, y: 5 },
    shadowColor: '#C7C7C7',
    shadowRadius: 40,
    shadowOpacity: 0.32,
    backgroundColor: '#FFF',
    marginTop: 20,
    overflow: 'hidden',
  },
  singlePicker: {
    backgroundColor: '#f5f6f7',
  },

  firstList: {
    marginTop: px2dp(30),
  },
  secondList: {
    marginTop: 30,
  }
})

export default PersonData;