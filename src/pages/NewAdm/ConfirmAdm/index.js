import React, {useMemo} from 'react';
import OneSignal from 'react-native-onesignal';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../../services/api';

import Background from '../../../components/Background';

import {Container, Avatar, Name, Time, SubmitButton} from './styles';

export default function ConfirmAdm({navigation}) {
  const provider = navigation.getParam('provider');
  const user = navigation.getParam('user');
  const service = navigation.getParam('service');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAddAppointment() {
    await api.post('appointmentsadm', {
      provider_id: provider.id,
      user_id: user.id,
      service_id: service.id,
      date: time,
    });

    navigation.navigate('DashboardAdm');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: user.avatar
              ? user.avatar.url
              : `https://api.adorable.io/avatars/50/${user.name}.png`,
          }}
        />

        <Name>{user.name}</Name>

        <Name>{service.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento para a cliente
        </SubmitButton>
      </Container>
    </Background>
  );
}

ConfirmAdm.navigationOptions = ({navigation}) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
