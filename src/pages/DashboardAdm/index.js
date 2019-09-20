import React, { useEffect, useState } from 'react';
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

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

function DashboardAdm() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      console.tron.log(date);

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = zonedTimeToUtc(checkDate, timezone);

        console.tron.log(checkDate);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  return (
    <Background>
        <Title>Agendamentos</Title>
        <DateInput date={date} onChange={setDate} />
      <Container>
            <List
              data={schedule}
              keyExtractor={item  => item.time}
              renderItem={({ item }) => (
                <AppointmentAdm data={item} past={item.past} available={!item.appointment}/>
              )}
            />
      </Container>
    </Background>
  );
}

DashboardAdm.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}

export default withNavigationFocus(DashboardAdm);

