import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Password from './pages/Password';

import SelectProvider from './pages/New/SelectProvider';
import SelectService from './pages/New/SelectService';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Feed from './pages/Feed';

export default (isSigned = false) => createAppContainer(
  createSwitchNavigator({
    Sign: createSwitchNavigator({
      SignIn,
      SignUp,
      Password,
    }),
    App: createBottomTabNavigator({
      Dashboard,
      New: {
        screen: createStackNavigator({
          SelectProvider,
          SelectService,
          SelectDateTime,
          Confirm,
        }, {
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: '#FFF',
            headerLeftContainerStyle: {
              marginLeft: 20,
            }
          },
        }),
        navigationOptions: {
          tabBarVisible: false,
          tabBarLabel: 'Agendar',
          tabBarIcon: (
            <Icon name="add-circle-outline"
            size={20} color="rgba(255, 255, 255, 0.6)" />
          )
        },
      },
      Profile,
      Feed,
    },{
      resetOnBlur: true,
      tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#48D1CC',
          height: 50,
        },
      },
    })
  }, {
    initialRouteName: isSigned ? 'App' : 'Sign',
  })
);
