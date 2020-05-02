import React, { useEffect, useState } from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Text,
} from 'react-native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import {
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import Lottie from 'lottie-react-native';

import 'intl';
import 'intl/locale-data/jsonp/pt';

import Background from '../../components/Background';
import DateInput from '../../components/DateInput';
import AppointmentAdm from '../../components/AppointmentAdm';
import AppointmentAdmMeia from '../../components/AppointmentAdmMeia';

import { Menu, Container, Title, List, BoxList } from './styles';

import Calendar from '../../assets/calendar.json';

const range = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const rangeMeia = [7.3, 8.3, 9.3, 10.3, 11.3, 12.3, 13.3, 14.3, 15.3, 16.3, 17.3, 18.3, 19.3];

function DashboardAdm({ isFocused, navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [scheduleMeia, setScheduleMeia] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadSchedule() {
    const response = await api.get('schedule', {
      params: { date },
    });

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dataMeia = rangeMeia.map((hour) => {
      const checkDateMeia = setSeconds(setMinutes(setHours(date, hour, 30, 40), 30), 0);
      const compareDateMeia = zonedTimeToUtc(checkDateMeia, timezone);
      return {
        timeMeia: `${hour}0 hrs`,
        pastMeia: isBefore(compareDateMeia, new Date()),
        appointmentMeia: response.data.find((a) =>
          isEqual(parseISO(a.date), compareDateMeia),
        ),
      };
    });


    const data = range.map((hour) => {
      const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
      const compareDate = zonedTimeToUtc(checkDate, timezone);
      return {
        time: `${hour}:00 hrs`,
        past: isBefore(compareDate, new Date()),
        appointment: response.data.find((a) =>
          isEqual(parseISO(a.date), compareDate),
        ),
      };
    });

    setScheduleMeia(dataMeia);
    setSchedule(data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSchedule();
    }
  }, [date, isFocused]);

  async function handleCancel(id) {
    Alert.alert(
      'Cancelar agendamento',
      'Deseja cancelar mesmo esse agendamento?',
      [
        {
          text: 'Não',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            async function canceld() {
              const response = await api.delete(`schedule/${id}`);
              setAppointments(
                appointments.map((appointment) =>
                  appointment.id === id
                    ? {
                      ...appointment,
                      canceled_at: response.data.canceled_at,
                    }
                    : appointment,
                ),
              );
            }
            canceld();
            loadSchedule();
          },
        },
      ],
    );
  }

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(async () => {
    //setRefreshing(true), //nao usar
    setLoading(true);
    await loadSchedule();
    setLoading(false);

    // wait(500).then(() => setRefreshing(false)); //nao usar
  }, [refreshing]);

  return (
    <Background>
      {loading ? (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Lottie resizeMode="contain" source={Calendar} autoPlay />
        </SafeAreaView>
      ) : (
          <Container>
            <Menu>
              <IconFA
                style={{ paddingRight: 20 }}
                onPress={() => navigation.openDrawer()}
                name="bars"
                color="#fff"
                size={25}
              />
            </Menu>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Title>Agendamentos</Title>
              <DateInput date={date} onChange={setDate} />
              <BoxList>
                <List
                  data={schedule}
                  keyExtractor={(item) => item.time}
                  renderItem={({ item }) => (
                    <AppointmentAdm
                      onCancel={() => handleCancel(item.appointment.id)}
                      data={item}
                      past={item.past}
                      available={!item.appointment}
                    />
                  )}
                />
                <List
                  data={scheduleMeia}
                  keyExtractor={(item) => item.timeMeia}
                  renderItem={({ item }) => (
                    <AppointmentAdmMeia
                      onCancel={() => handleCancel(item.appointmentMeia.id)}
                      data={item}
                      past={item.pastMeia}
                      available={!item.appointmentMeia}
                    />
                  )}
                />
              </BoxList>
            </ScrollView>
          </Container>
        )}
    </Background>
  );
}

DashboardAdm.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(DashboardAdm);

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
  },
});
