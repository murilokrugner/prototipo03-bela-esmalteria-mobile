import React, { useState, useEffect } from 'react';
//import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';
import Background from '../../../../components/Background';

import { Container, ServicesList, Services, Name } from './styles';

import api from '../../../../services/api';

export default function SelectServiceEdit({ navigation }) {
  const [services, setServices] = useState([]);

  const provider = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadServices() {
      const response = await api.get(`services?provider=${provider}`);

      setServices(response.data);
    }

    loadServices();
  }, [])

  return (
    <Background>
      <Container>
        <ServicesList
          data={services}
          keyExtractor={service => String(service)}
          renderItem={({ item: service }) => (
            <Services
              onPress={() =>
                navigation.navigate('EditingService', {service})}>

              <Name>{service.name}</Name>
            </Services>
          )}
          >
        </ServicesList>
      </Container>
    </Background>
  );
}

SelectServiceEdit.navigationOptions = ({ navigation }) => ({
  title: 'Selecione um serviço para editar',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashboardAdm');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
  headerTransparent: true,
  headerTintColor: '#FFF',
  headerLeftContainerStyle: {
    marginLeft: 20,
  }
});


