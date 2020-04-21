import React, { useState, useEffect } from 'react';
//import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from "react-navigation";
import { useSelector } from 'react-redux';
import Background from '../../../../components/Background';
import Loading from '../../../../components/Loading';
import { Container, ServicesList, Services, Name } from './styles';

import api from '../../../../services/api';

function SelectServiceEdit({ isFocused, navigation }) {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const provider = useSelector(state => state.user.profile.id);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      async function loadServices() {
        const response = await api.get(`services?provider=${provider}`);

        setServices(response.data);
      }

      loadServices();
      setLoading(false);
    }

  }, [isFocused])

  return (
    <Background>
      <Container>
        {loading ? (
          <Loading />
        ): (
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
        )}
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
        navigation.openDrawer();
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


export default withNavigationFocus(SelectServiceEdit);
