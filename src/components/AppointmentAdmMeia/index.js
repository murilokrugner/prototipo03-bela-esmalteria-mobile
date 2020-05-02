import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Swipeout from 'react-native-swipeout';
import LongPressForAndroidSwipeout from 'react-native-swipeout-longpressforandroid'
import { Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time, Content } from './styles';
import { bold } from 'ansi-colors';

import api from '../../services/api';

export default function AppointmentAdmMeia({ data, onCancel }) {
  /*const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);*/


  return (
    <Container past={data.pastMeia}>
      <Left>
        <Info available={data.available}>
          <Avatar
            source={{
              uri: data.appointmentMeia
                ? data.appointmentMeia.user.avatar.url
                : `https://api.adorable.io/avatars/50/murilo.png`
            }}
          />
          <Content>
            <Name>{data.appointmentMeia ? data.appointmentMeia.user.name : 'Horário Disponível'}</Name>
            <Name>{data.appointmentMeia ? 'Serviço: ' + data.appointmentMeia.service.name : ''}</Name>
            <Time>Horário: {data.timeMeia}</Time>
          </Content>
        </Info>
      </Left>

      {data.appointmentMeia && !data.pastMeia && !data.canceled_at && (
        <TouchableOpacity style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center', width: 130 }} onPress={onCancel}>
          <Icon name="event-busy" size={30} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
