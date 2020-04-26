import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import DashboardAdm from '../pages/DashboardAdm';
import api from '../services/api';

export default class OneSignalConfig extends Component {
  constructor(props, idUser) {
    super(props);

    this.state = {
      playerId: '',
      user: '',
    }


    OneSignal.init('2b0a8b54-2681-4a01-bcad-9f1b81d08f71');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    this.state = { user: props.idUser };
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (data) => { };
  onOpened = (notification) => { };

  onIds = (id, props) => {
    this.state = { user: this.props.idUser, playerId: id.userId };

    async function save(user, playerId) {
      const response = await api.put('/playerid', {
        user_id: user,
        player: playerId,
      });
    }

    save(this.state.user, this.state.playerId);
  };

  render() {
    return (
      <>
      </>
    )
  }
}
