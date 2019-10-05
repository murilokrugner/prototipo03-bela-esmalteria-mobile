import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Swipeout from 'react-native-swipeout';
//import LongPressForAndroidSwipeout from 'react-native-swipeout-longpressforandroid'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time, Content } from './styles';

export default function AppointmentAdm({ data, onCancel }) {
  /*const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);*/


  return (
    /**<Swipeout
      right={[{text: 'Delete', type: 'delete'}]} onPress={onCancel} disabled={(data.appointment && data.appointment) ? false : true}>**/
      <Container past={data.past}>
      <Left>
        <Info available={data.available}>
          <Avatar
            source={{
            uri: data.appointment
            ? data.appointment.user.avatar.url
            : `https://api.adorable.io/avatars/60/${data.appointment ? data.appointment.user.name: 'null'}.png`,
          }}
          />
          <Content>
            <Name>{data.appointment ? data.appointment.user.name : 'Disponível'}</Name>
            <Time>Horário: {data.time}</Time>

          </Content>
        </Info>
      </Left>
    </Container>
    /**</Swipeout>*/

  );
}

/**{data.appointment && data.appointment && (
          <TouchableOpacity >
          </TouchableOpacity>
        )} */

        /*<Name>{data.appointment ? data.appointment.service_id: ''}</Name>*/
