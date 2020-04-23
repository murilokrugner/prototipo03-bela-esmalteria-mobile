import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../../components/Background';
import { Container, Header, HeaderName, Form, FormInput, SubmitButton } from './styles';
import api from '../../../../services/api';

export default function EditingService({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const service = navigation.getParam('service');
  const prices = service.price.toString();
  const durations = service.duration.toString();

  const priceRef = useRef();
  const durationRef = useRef();

  useEffect(() => {
    setName(service.name);
    setPrice(prices);
    setDuration(durations);
    setLoading(false);
  }, []);

  async function handleSubmit() {
    setLoading(true);
    const response = await api.put(`services/${service.id}`, {
      name,
      price,
      duration,
    })

    if (response) {
      Alert.alert('Serviço atualizado!');
      setLoading(false);
      navigation.navigate('DashboardAdm');
      navigation.openDrawer();
    }
  }

  return (
    <Background>
      <Container>
        <Header>Atualizar serviço</Header>
        <Form>
          <HeaderName>Nome do serviço</HeaderName>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder={'Descrição do serviço'}
            value={name}
            onSubmitEditing={() => priceRef.current.focus()}
            returnKeyType="next"
            onChangeText={setName}
          />
          <HeaderName>Preço</HeaderName>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder={'Preço do serviço'}
            ref={priceRef}
            onSubmitEditing={() => durationRef.current.focus()}
            returnKeyType="next"
            value={price}
            onChangeText={setPrice}
          />
          <HeaderName>Duração em minutos</HeaderName>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder={'Duração do serviço em minutos'}
            ref={durationRef}
            value={duration}
            returnKeyType="send"
            onChangeText={setDuration}
          />
        </Form>

        <SubmitButton loading={loading} onPress={handleSubmit}>Atualizar</SubmitButton>

      </Container>
    </Background>
  );
}

EditingService.navigationOptions = ({ navigation }) => ({
  //title: 'Editar serviço',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectServiceEdit');
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

