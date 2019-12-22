import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
//import { DotIndicator } from 'react-native-indicators';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Lottie from 'lottie-react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Menu, Container, Title, List, Message } from './styles';

import Calendar from '~/assets/calendar.json';

function Dashboard({ isFocused, navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused])

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
            ...appointment,
            canceled_at: response.data.canceled_at,
          }
          : appointment
      )
    );
  }

  return (
    <Background>
      { loading ? (
            <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Lottie resizeMode="contain" source={Calendar} autoPlay />
          </SafeAreaView>
      ) : (
        <Container>
          <Menu>
            <IconFA
              style={{paddingRight: 20}}
              onPress={() => navigation.openDrawer()}
              name="bars"
              color="#fff"
              size={25}
            />
          </Menu>
          <Title>Agendamentos</Title>
            <List
              data={appointments}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Appointment onCancel={() => handleCancel(item.id)} data={item} />
              )}
            />
            <Message>Para cancelar seu agendamento, entre em contato com a Manicure</Message>
      </Container>
      )}
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => <Icon name="event" size={20} color={tintColor}/>
}

export default withNavigationFocus(Dashboard);

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },
})
