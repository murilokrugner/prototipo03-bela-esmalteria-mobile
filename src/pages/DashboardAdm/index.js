import React, { useEffect, useState } from 'react';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import AppointmentAdm from '~/components/AppointmentAdm';

import { Container, Info, List } from './styles';

const range = [8, 9, 10, 12, 13, 14, 15, 16];

function DashboardAdm() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = parseISO(date);

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

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
      <DateInput date={date} onChange={setDate} />
      <Container>
            <List
              data={schedule}
              keyExtractor={hour => hour.time}
              past={hour => hour.past}
              available={hour => !hour.appointment}
              renderItem={({ item: hour }) => (
                <AppointmentAdm data={hour}/>
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

