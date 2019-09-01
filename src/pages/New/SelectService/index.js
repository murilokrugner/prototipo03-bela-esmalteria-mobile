import React, {useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ServicesList, Services, Avatar, Name } from './styles';

export default function SelectService() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const response = await api.get('providers');

      setServices(response.data);
    }

    loadServices();
  }, []);

  return (
    <Background>
      <Container>
        <ServicesList
          data={services}
          keyExtractor={service => String(service.id)}
          renderItem={({ item: service }) => (
            <Services>
              <Avatar source={{uri: `http://api.adorable.io/avatar/50/avatar.png`}} />
              <Name>{service.name}</Name>
            </Services>
          )}
        />
      </Container>
    </Background>
  );
}

SelectService.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o serviço',
  headerLeft: () => (
    <TouchableOpacity onPress={() => {navigation.navigate('Dashboard')}}>
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
