import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import {
  format,
  subHours,
  addHours,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
  isAfter,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import 'intl';
import 'intl/locale-data/jsonp/pt';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import AppointmentAdm from '~/components/AppointmentAdm';


import { Container, Title, List } from './styles';

const range = [8, 9, 10, 12, 13, 14, 15, 16];

function DashboardAdm() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = zonedTimeToUtc(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
      setLoading(false);
    }

    loadSchedule();
  }, [date]);

  return (
    <Background>
      { loading ? (
        <ActivityIndicator color="#FFF" size="large" style={styles.load}/>
      ): (
        <Container>
          <Title>Agendamentos</Title>
          <DateInput date={date} onChange={setDate} />
          <List
            data={schedule}
            keyExtractor={item  => item.time}
            renderItem={({ item }) => (
            <AppointmentAdm data={item} past={item.past} available={!item.appointment}/>
            )}
            />
        </Container>
      )}
    </Background>
  );
}

DashboardAdm.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}

export default withNavigationFocus(DashboardAdm);

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },
})
