import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { 
    TabOneScreenOneContainer,
    TabTwoScreenOneContainer, 
    AnswerPageContainer,
    ActivityBoxContainer,
    TabOneScreenTwoContainer,
    FeedbackContainer,
    ModifyPasswordContainer,
} from '../containers/';
import TabThreeScreenOneContainer from '../containers/AccountContainer';

import {
    ResultPage,
} from './TabTwo/views/';

import {
  PersonData,
  Setting,
} from './TabThree/views/';

import {
  MessageBox,
  Feedback,
  ModifyPassword,
} from '../components/common/';

const TabTwoNavigation = StackNavigator({
      TabTwoScreenOneContainer: { screen: TabTwoScreenOneContainer },
      AnswerPage: { screen: AnswerPageContainer },
      ResultPage: { screen: ResultPage },
    },
);

const TabOneNavigation = StackNavigator({
    TabOneScreenOneContainer: { screen: TabOneScreenOneContainer },
    TabOneScreenTwo: { screen: TabOneScreenTwoContainer },
  },
);

const TabThreeNavigation = StackNavigator({
  TabThreeScreenOneContainer: { screen: TabThreeScreenOneContainer },
  PersonData: { screen: PersonData },
  MessageBox: { screen: MessageBox },
  Setting: { screen: Setting },
  ActivityBox: { screen: ActivityBoxContainer },
  Feedback: { screen: FeedbackContainer },
  ModifyPassword: { screen: ModifyPasswordContainer },
  TabOneScreenTwo: { screen: TabOneScreenTwoContainer },
});

const routeConfigs = {
  TabOneNavigation: { 
      screen: TabOneNavigation,
      navigationOptions: {
        tabBarLabel: '党国风采',
        tabBarIcon: ({ tintColor}) => (
            <Image
                source={require('./TabOne/img/logo.png')}
                style={[styles.icon1, { tintColor: tintColor }]}
            />
  )
      }
  },
  TabTwoNavigation: { 
      screen: TabTwoNavigation,
      navigationOptions: {
        tabBarLabel: '在线学习',
        tabBarIcon: ({ tintColor }) => ( 
            <Image source = { require('./TabTwo/img/logo.png') }
                style = {
                    [styles.icon2, { tintColor: tintColor }]
                }
            />
        )
      }
  },
  TabThreeNavigation: { 
      screen: TabThreeNavigation,
      navigationOptions: {
        tabBarLabel: '我的账号',
        tabBarIcon: ({ tintColor}) => (
            <Image
            source={require('./TabThree/img/logo.png')}
            style={[styles.icon3, { tintColor: tintColor }]}
            />
        )
      }
  
  },
};

const tabNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: '#D0011B',
        inactiveTintColor: 'black',
        style: {
            ...ifIphoneX({
              height: 79.5,
            }, {
              height: 59.5,
            }),
            backgroundColor: '#F5F6F7',
            paddingTop: 4.7,
            paddingLeft: 25.3,
            paddingRight: 24,
        },
        labelStyle: {
            fontFamily: 'PingFangSC-Light',
            fontSize: 12,
            ...ifIphoneX({
              bottom: 15,
            }, {
              bottom: -0.3
            }),
        }
    },
    backBehavior: 'none',
    lazy: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,

};

const styles = StyleSheet.create({
    icon1: {
        width: 28,
        height: 30.71,
        ...ifIphoneX({
          bottom: 7,
        }),
    },
    icon2: {
        width: 30,
        height: 29,
        ...ifIphoneX({
          bottom: 7,
        }),
    },
    icon3: {
        width: 26,
        height: 30,
        ...ifIphoneX({
          bottom: 7,
        }),
    }
})

const TabBarNavigation = TabNavigator(routeConfigs, tabNavigatorConfig);

export default TabBarNavigation;