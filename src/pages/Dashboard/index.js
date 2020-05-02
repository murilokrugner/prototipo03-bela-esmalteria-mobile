import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
//import { DotIndicator } from 'react-native-indicators';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Lottie from 'lottie-react-native';
import Sad from '../../assets/sad.png';
import api from '../../services/api';
import sino from '../../assets/sino.png';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import {
  Menu,
  Container,
  Title,
  BoxNotAppoint,
  List,
  BoxImage,
  Message,
} from './styles';

import Calendar from '../../assets/calendar.json';

function Dashboard({ isFocused, navigation }) {
  const [appointments, setAppointments] = useState(['']);
  const [haveAppointment, setHaveAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);

    if (response.data) {
      setHaveAppointment(true);
    } else {
      setHaveAppointment(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(async () => {
    //setRefreshing(true), //nao usar
    setLoading(true);
    await loadAppointments();
    setLoading(false);

    // wait(500).then(() => setRefreshing(false)); //nao usar
  }, [refreshing]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

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
              {!haveAppointment && (
                <BoxNotAppoint>
                  <Image source={Sad} style={{ width: 80, height: 80 }} />
                  <Text>Você não possui nenhum agendamento...</Text>
                </BoxNotAppoint>
              )}
              <>
                <List
                  data={appointments}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <Appointment
                      onCancel={() => handleCancel(item.id)}
                      data={item}
                    />
                  )}
                />
                <BoxImage>
                  <Image source={sino} style={{ width: 30, height: 30 }} />
                  <Message>Para cancelar seu agendamento</Message>
                  <Message>entre em contato com a Manicure</Message>
                </BoxImage>
              </>
            </ScrollView>
          </Container>
        )}
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center',
  },
});
