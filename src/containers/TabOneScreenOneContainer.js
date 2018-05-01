// react component all need package
import React, { PureComponent } from 'react';
// import component from react-native
import { View, Platform } from 'react-native';
// import react bind library connect
import { connect } from 'react-redux';
// import presentation component
import { TabOneScreenOne } from '../components/TabOne/views/';
// import actions constants
import { 
  GET_NEWS,
  GET_EVENTS,
  GET_ACTIVE_EVENTS,
} from '../constants/';
// import Header from common
import { Header } from '../components/common/';
import px2dp from '../util/index';


class TabOneScreenOneContainer extends PureComponent {
  componentDidMount() {
    // get the dispatch from the connect
    const { dispatch, navigation } = this.props;

    // dispatch GET_NEWS && GET_ATTEND_EVENTS , get news and event
    dispatch({ type: GET_NEWS, payload: { active: false, mode: 'header' } });
    dispatch({ type: GET_EVENTS, payload: { active: false, mode: 'header' } });
    dispatch({ type: GET_ACTIVE_EVENTS, payload: { headline: true, mode: 'header' } });
  }

  render() {
    // definitely give out all need pass data in one place
    const { 
      news, 
      events, 
      needAttendEvents, 
      navigation,
      isGettingEvents, 
      isGettingNews,
      dispatch,
    } = this.props;

    return (
      <TabOneScreenOne
        events={events}
        news={news}
        dispatch={dispatch}
        needAttendEvents={needAttendEvents}
        navigation={navigation}
        isGettingEvents={isGettingEvents}
        isGettingNews={isGettingNews}
      />
    );
  }
}

// define the header for this component
TabOneScreenOneContainer.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <View style={{ 
      ...Platform.select({
        ios: {
          height: 90
        },
      })
     }}>
        <Header 
          headerText="党员之家"
          navigation={navigation}
        />
    </View>
  ),
});

export default connect(
  // mapStateToProps
  state => {
    // get the singleEvent from the state tree
    const { events, isGettingEvents, needAttendEvents } = state.events.events;
    // get the singleNews from the state tree
    const { news, isGettingNews } = state.news.news;
    return {
      events,
      news,
      isGettingEvents,
      isGettingNews,
      needAttendEvents,
    };
  },
)(TabOneScreenOneContainer);