class TabOneScreenOne extends Component {
  
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

  componentDidMount() {
  }

  _onRefresh(id) {
    // this.setState({
    //   isRefreshing: true,
    // })
    // this.waitRefreshing();
    // if (ACTIONS[id] === REQUEST_NEWS) {
    //   let { news } = this.props.news;
    //   if (!news.next) {
    //     return;
    //   }
      
    //   // this.props.dispatch(fetchNews(news.next[news.next.length - 1]));
    // } else if (ACTIONS[id] === REQUEST_EVENTS) {
    //   let { events } = this.props.events;
    //   if (!events.next) {
    //     return
    //   }
    //   // this.props.dispatch(fetchEvents(events.next[events.next.length - 1]));
    // }
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
    })
  }

  ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
  })

  _renderRow(rowData, navigation, item) {
    const { currentPage } = this.state;
    console.log('currentPage', currentPage);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('TabOneScreenTwo', { data: { type: currentPage === 0 ? GET_SINGLE_EVENT : GET_SINGLE_NEWS, id: rowData._id } , title: item.title })}>
        <NewsItem {...rowData} key={rowData.id} />
      </TouchableOpacity>
    )
  }

  _renderNoMore() {
    return (
      <View style={styles.loadingMore}>
        <Text style={styles.loadingMoreText}>没有更多了</Text>
      </View>
    )
  }

  _renderFooter(currentPage) {
    const { events, news } = this.props;
    if (currentPage == 0) {
      if (events.length < 10) {
        return this._renderNoMore();
      } else {
        return <ActivityIndicator style={styles.loadingMore} />
      }
    } else {
      if (news.length < 10) {
        return this._renderNoMore();
      } else {
        return <ActivityIndicator style={styles.loadingMore}/>
      }
    }
  }

  render() {
    const { navigation, events, news, dispatch } = this.props;

    console.log('navigation', navigation);

    let headline = [
      {
        photo: require('../img/test.jpeg'),
        title: '校园一站到底活动圆满结束',
      },
      {
        photo: require('../img/test.jpeg'),
        title: '校园一站到底活动圆满结束',
      },
      {
        photo: require('../img/test.jpeg'),
        title: '校园一站到底活动圆满结束',
      },
      {
        photo: require('../img/test.jpeg'),
        title: '校园一站到底活动圆满结束',
      },
      {
        photo: require('../img/test.jpeg'),
        title: '校园一站到底活动圆满结束',
      },
    ];
    // if (events.headlineEvents) {
    //   headline = headline.concat(events.headlineEvents);
    // }
    let dataSource = [
      this.ds.cloneWithRows(DATA),
      this.ds.cloneWithRows(DATA)
    ];

    let currentPage = this.state.currentPage;

    let isFetching = currentPage == 0 ? events.isFetching : news.isFetching;
    return (
      <View style={styles.container}>
        <View
          style={[ styles.topView]}
        >
          <View style={styles.listBox}>
            <ScrollViewTabView
              ref={(listView) => this.listView = listView}
              isFetching={isFetching}
              dispatch={dispatch}
              navigation={navigation}
              headline={headline}
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
                      refreshControl={
                        <RefreshControl
                          tintColor="#fff"
                          onRefresh={() => this._onRefresh(this.state.currentPage)}
                          refreshing={this.state.isRefreshing}
                        />
                      }
                      showsVerticalScrollIndicator={false}
                      automaticallyAdjustContentInsets={false}
                      onEndReachedThreshold={10}
                      onEndReached={() => this._onRefresh(this.state.currentPage)}
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
  topView: {
    top: -92,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  listBox: {
    marginTop: 92,
    height: px2dp(height + 99),
    width,
    backgroundColor: '#fff'
  },
  listBox1: {
    height: px2dp(height - 90 - 49),
    width,
  },
  listBox2: {
    height: px2dp(height - 90 - 49),
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
    marginBottom: 200
  },
  loadingMoreText: {
    color: '#777',
    textAlign: 'center',
  }
})