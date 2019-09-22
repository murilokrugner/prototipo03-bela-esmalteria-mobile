import React from 'react';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator,
createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Password from './pages/Password';

import SelectProvider from './pages/New/SelectProvider';
import SelectService from './pages/New/SelectService';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

import Dashboard from './pages/Dashboard';

import DashboardAdm from './pages/DashboardAdm';
import ProfileAdm from './pages/PersonAdm/ProfileAdm';
import ProfileEditAdm from './pages/PersonAdm/ProfileEditAdm';
import AboutAdm from './pages/PersonAdm/AboutAdm';
import Users from './pages/PersonAdm/Users';

import Profile from './pages/Person/Profile';
import ProfileEdit from './pages/Person/ProfileEdit';
import About from './pages/Person/About';

import Feed from './pages/Feed';

export default (isSigned = false, provider) => createAppContainer(
  createSwitchNavigator({
    Sign: createSwitchNavigator({
      SignIn,
      SignUp,
      Password,
    }),
    Admin: createBottomTabNavigator({
      DashboardAdm,
      Feed,
      PersonAdm: {
        screen: createStackNavigator({
          ProfileAdm,
          ProfileEditAdm,
          AboutAdm,
          Users,
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
          tabBarLabel: 'Perfil',
          tabBarIcon: (
            <Icon name="add-circle-outline"
            size={20} color="rgba(255, 255, 255, 0.6)" />
          )
        },
      },
      },{ resetOnBlur: true,
          tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#FFF',
          inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          style: {
            backgroundColor: '#48D1CC',
            height: 50,
        }
      },
    },),
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
      Person: {
        screen: createStackNavigator({
          Profile,
          ProfileEdit,
          About,
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
          tabBarLabel: 'Perfil',
          tabBarIcon: (
            <Icon name="add-circle-outline"
            size={20} color="rgba(255, 255, 255, 0.6)" />
          )
        },
      },
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
    initialRouteName: isSigned || provider === true ? 'Admin' : 'Sign',
  })
);


