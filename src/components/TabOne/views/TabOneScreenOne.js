import React, { PureComponent } from 'react';
import { 
  Text, 
  View, 
  RefreshControl, 
  Dimensions, 
  ActivityIndicator, 
  StyleSheet, 
  Animated, 
  ListView, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
} from 'react-native';
import ScrollViewTabView from './ScrollViewTabView';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Carousel1 from './Carousel1';
import MidTitle from './MidTitle';
import NewsItem from './NewsItem';
import Header from '../../common/Header';
import ScrollHeader from './ScrollHeader';
import DefaultTabBar from './DefaultTabBar';
import px2dp from '../../../util';
import request from '../../../util/request';


import {
  GET_EVENTS,
  GET_NEWS,
  GET_SINGLE_EVENT,
  GET_SINGLE_NEWS,
  GET_ACTIVE_EVENTS,
} from '../../../constants';

const TAB = [
  {
    id: 0,
    title: '党建活动',
  }, 
  {
    id: 1,
    title: '时事新闻',
  }
];

// construct cache array
var cachedResults = {
  items: [],
  total: 0,
};

const DATA = [
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },
  {
    image: require('../img/test.jpeg'),
    title: '第五届“唱支山歌给党听”合唱比赛开幕',
    createdAt: '2017年3月1日',
  },

];


const { width, height } = Dimensions.get('window');

class TabOneScreenOne extends PureComponent {
  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });
  
  constructor(props) {
    super(props);

    this.scrollY = new Animated.Value(0)
    this.state = {
      scrollY: 0,
      imgOpacity: 1,
      currentPage: 0,
      isRefreshing: false,
    };

    this._onRefresh = this._onRefresh.bind(this)
  }

  _onRefresh(mark) {
    console.log('mark', mark);
    const { currentPage } = this.state;
    const { dispatch, events, news } = this.props;

    const eventsLength = events ? events.results.length : 0;
    const newsLength = news ? news.results.length : 0;

    // the first enter, do not fresh.
    if (currentPage === 0 && eventsLength === 0) {
      return;
    }

    if (currentPage === 1 && newsLength === 0) {
      return;
    }

    if (mark !== 'footer') {
      this.setState({
        isRefreshing: true,
      });
  
  
      this.waitRefreshing();
    }

    if (currentPage === 0) {
      if (events && Object.keys(events).includes('next')) {
        dispatch({ type: GET_EVENTS, payload: { active: false, mode: mark, next: events.next } });
      } else {
        dispatch({ type: GET_EVENTS, payload: { active: false, mode: mark } });
      }
      // dispatch GET_NEWS && GET_ATTEND_EVENTS , get news and event
     
      if (mark !== 'footer') {
        dispatch({ type: GET_ACTIVE_EVENTS, payload: { active: true } });
      }
    } else {
      if (news && Object.keys(news).includes('next')) { 
        dispatch({ type: GET_NEWS, payload: { active: false, mode: mark, next: news.next } });
      } else {
        dispatch({ type: GET_NEWS, payload: { active: false, mode: mark } });
      }
      
      if (mark !== 'footer') {
        dispatch({ type: GET_ACTIVE_EVENTS, payload: { active: true } });
      }
    }
  }

  waitRefreshing() {
    const that = this;
    this.timers = setTimeout(() => {
      that.setState({
        isRefreshing: false,
      });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timers);
  }

  getCurrentPage(currentPage) {
    this.setState({
      currentPage,
    });
  }

  _renderRow(rowData, navigation, item) {
    const { currentPage } = this.state;
    console.log('currentPage', currentPage);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TabOneScreenTwo', { data: { type: currentPage === 0 ? GET_SINGLE_EVENT : GET_SINGLE_NEWS, id: rowData.id } , title: item.title })}>
        <NewsItem {...rowData} key={rowData.id} />
      </TouchableOpacity>
    )
  }

  _renderNoMore() {
    return (
      <View style={styles.loadingMore}>
        <Text style={styles.loadingMoreText}>我是有底线的 : )</Text>
      </View>
    )
  }

  _renderFooter(currentPage) {
    const { events, news } = this.props;

    const eventNext = events ? events.next : null;
    const newNext = news ? news.next : null;
    if (currentPage == 0) {
      if (!eventNext) {
        return this._renderNoMore();
      } else {
        return <ActivityIndicator style={styles.loadingMore} />
      }
    } else {
      if (!newNext) {
        return this._renderNoMore();
      } else {
        return <ActivityIndicator style={styles.loadingMore}/>
      }
    }
  }

  render() {
    const { 
      navigation, 
      events, 
      news, 
      needAttendEvents,
      dispatch,
      isGettingNews,
      isGettingEvents, 
    } = this.props;


    let headline = needAttendEvents ? needAttendEvents.results : [];
    // if (events.headlineEvents) {
    //   headline = headline.concat(events.headlineEvents);
    // }
    let dataSource = [
      this.ds.cloneWithRows(events ? events.results : []),
      this.ds.cloneWithRows(news ? news.results : [])
    ];

    let currentPage = this.state.currentPage;

    let isFetching = currentPage == 0 ? isGettingEvents : isGettingNews;
    return (
      <View style={styles.container}>
          <View style={styles.listBox}>
          <View style={{ 
              height: px2dp(184), 
              width: width,
            }}>
            <Carousel1 headline={headline} navigation={navigation} />
          </View>
          <ScrollViewTabView
              ref={(listView) => this.listView = listView}
              isFetching={isFetching}
              dispatch={dispatch}
              navigation={navigation}
              headline={headline}
              style={{ ...ifIphoneX({
                marginTop: px2dp(20),
              }, {
                
              }),}}
              getCurrentPage={this.getCurrentPage.bind(this)}
              imgOpacity={this.state.imgOpacity}
              renderTabBar={() => <DefaultTabBar  />}
            >
              {
                TAB.map(item => (
                  <View
                    tabLabel={item.title}
                    key={item.id}
                    style={[ styles.listBox1 ]}
                  >
                    <View style={ styles.listBox2}>
                      <ListView
                        dataSource={dataSource[item.id]}
                        enableEmptySections
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        onEndReachedThreshold={10}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this._onRefresh('header')}
                          />
                        }
                        onEndReached={() => this._onRefresh('footer')}
                        renderFooter={() => this._renderFooter(this.state.currentPage)}
                        renderRow={(rowData) => this._renderRow(rowData, navigation, item)}
                        scrollEventThrottle={16}
                      />
                    </View>
                  </View>
                ))
              }
          </ScrollViewTabView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  carousel: {
    top: 0,
    zIndex: 10,
  },
  header: {
    marginBottom: 16,
  },
  scrollView: {
    marginTop: 125,
    height: 300,
  },
  listBox: {
    marginTop: 23,
    height: px2dp(height + 99),
    width,
    backgroundColor: '#fff'
  },
  listBox1: {
    height: px2dp(height - 90 - 49),
    width,
  },
  listBox2: {
    height: px2dp(height - 90 - 69),
    width,
    marginBottom: 90
  },
  indicatorBox: {
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    marginTop: 5,
    marginLeft: 5
  },
  loadingMore: {
    marginTop: 10,
    marginBottom: px2dp(250)
  },
  loadingMoreText: {
    color: '#777',
    textAlign: 'center',
  }
});

export default TabOneScreenOne;