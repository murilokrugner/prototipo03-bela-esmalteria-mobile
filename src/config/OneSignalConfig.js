import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import DashboardAdm from '../pages/DashboardAdm';
import api from '../services/api';

export default class OneSignalConfig extends Component {
  constructor(props, idUser) {
    super(props);

    this.state = {
      player: '',
      user: '',
    }

    this.state = {user: props.idUser};

    OneSignal.init('2b0a8b54-2681-4a01-bcad-9f1b81d08f71');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }

    onIds = (id) => {
      this.state = {player: id.userId};
      const res = api.post('playerid', {
        user_id: this.state.user,
        player: this.state.player,
      });
    };

    onReceived = (data) => {};
    onOpened = (notification) => {};

  render() {
    const { player } = this.state;
    return (
      <>
      </>
    )
  }
}
