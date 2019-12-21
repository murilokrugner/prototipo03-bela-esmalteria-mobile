import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../../components/Background';
import { Container, Header, HeaderName, Form, FormInput, SubmitButton } from './styles';
import api from '../../../../services/api';

export default function EditingService({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const service = navigation.getParam('service');
  const prices = service.price.toString();
  const durations = service.duration.toString();

  const priceRef = useRef();
  const durationRef = useRef();

  async function handleSubmit() {
    const response = await api.put(`services/${service.id}`, {
      name,
      price,
      duration,
    })

    if (response) {
      Alert.alert('Serviço atualizado!');
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
            placeholder={service.name}
            value={name}
            onSubmitEditing={() => priceRef.current.focus()}
            returnKeyType="next"
            onChangeText={setName}
          />
          <HeaderName>Preço</HeaderName>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder={prices}
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
            placeholder={durations}
            ref={durationRef}
            value={duration}
            returnKeyType="send"
            onChangeText={setDuration}
          />
        </Form>

        <SubmitButton onPress={handleSubmit}>Atualizar</SubmitButton>

      </Container>
    </Background>
  );
}


EditingService.navigationOptions = ({ navigation }) => ({
  title: 'Editar serviço',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectServiceEdit');
      }}
    >
    </TouchableOpacity>
  ),
});

