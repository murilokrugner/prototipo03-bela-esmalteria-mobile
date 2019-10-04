import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

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
            : `https://api.adorable.io/avatars/50/${data.appointment ? data.appointment.user.name: 'null'}.png`,
          }}
          />
          <Time>Horário: {data.time}</Time>
          <Name>{data.appointment ? data.appointment.user.name : 'Status: disponível'}</Name>
          <Name>{data.appointment ? data.appointment.service_id: 'sem serviço'}</Name>
        </Info>
      </Left>
      {data.appointment && data.appointment && (
          <TouchableOpacity onPress={onCancel}>
            <Icon name="event-busy" size={20} color="#f64c75" />
          </TouchableOpacity>
        )}
    </Container>
  );
}
