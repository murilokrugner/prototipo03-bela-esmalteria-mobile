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

export default function AppointmentAdm({ data, onCancel }) {
  /*const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);*/


  return (
      <Container past={data.past}>
      <Left>
        <Info available={data.available}>
          <Avatar
            source={{
              uri: data.appointment
              ? data.appointment.user.avatar.url
              : `https://api.adorable.io/avatars/50/murilo.png`
            }}
          />
          <Content>
            <Name>{data.appointment ? data.appointment.user.name : 'Disponível'}</Name>
            <Name>{data.appointment ? 'Serviço: ' + data.appointment.service.name : ''}</Name>
            <Time>Horário: {data.time}</Time>
          </Content>
        </Info>
      </Left>

      {data.appointment && !data.past && !data.canceled_at &&(
          <TouchableOpacity onPress={onCancel}>
            <Icon name="event-busy" size={30} color="#f64c75" />
          </TouchableOpacity>
        )}
    </Container>
  );
}
